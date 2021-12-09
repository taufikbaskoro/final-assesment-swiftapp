import React, {useEffect, useState} from 'react';
import {useReactiveVar} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {customUseMutation} from '@app/hooks/customApolloHooks';
import {rxUserInformation, rxAppSnackbar} from '@app/services/cache';
import {
  CANCEL_REQUEST_RMA,
  CREATE_REQUEST_RMA,
  UPDATE_REQUEST_RMA,
} from '@app/_modules/account/services/schema';

import RMAFormModalViews from '@app/_modules/account/atoms/RMAFormModal/views';

export default function RMAFormModal({
  type = 'new-request',
  visible,
  setVisible,
  rmaFormData,
  incrementId,
  orderNumber,
  customFieldFormData = null,
}) {
  const navigation = useNavigation();
  const accountInformation = useReactiveVar(rxUserInformation);
  const [submitReturnRequest] = customUseMutation(CREATE_REQUEST_RMA);
  const [updateReturnRequest] = customUseMutation(UPDATE_REQUEST_RMA);
  const [cancelReturnRequest] = customUseMutation(CANCEL_REQUEST_RMA);
  const [productsToReturn, setProductsToReturn] = useState({});
  const [customFieldsRequestData, setCustomFieldsRequestData] = useState([]);
  const [customFieldsRequestSelected, setCustomFieldsRequestSelected] =
    useState({});
  const [customFieldsItemData, setCustomFieldsItemData] = useState([]);
  const [threadMessage, setThreadMessage] = useState(null);
  const [postedThreadMessages, setPostedThreadMessages] = useState([]);
  const [packageSentStatus, setPackageSentStatus] = useState(
    rmaFormData.status ? rmaFormData.status?.name === 'Package Sent' : false,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const populateCustomField = customField => {
      const fieldOptions = [];
      customField.options.map(option =>
        fieldOptions.push({
          label: option.frontend_labels[0].value,
          value: option.id,
        }),
      );
      return {name: customField.name, id: customField.id, items: fieldOptions};
    };

    let formData = customFieldFormData
      ? customFieldFormData.custom_fields
      : rmaFormData?.custom_fields;

    if (formData && customFieldsItemData.length === 0) {
      formData?.map(customField => {
        if (customField.refers === 'request') {
          const tmp = customFieldsRequestData;
          tmp.push(populateCustomField(customField));
          setCustomFieldsRequestData(tmp);

          if (type === 'new-request') {
            setCustomFieldsRequestSelected({
              ...customFieldsRequestSelected,
              [customField.id]: 1,
            });
          }
        }
        if (customField.refers === 'item') {
          const tmp = customFieldsItemData;
          tmp.push(populateCustomField(customField));
          setCustomFieldsItemData(tmp);
        }
      });
    }

    if (type === 'update-request') {
      let selectedTmp = {};
      rmaFormData.custom_fields.map(async customField => {
        selectedTmp = {
          ...selectedTmp,
          [customField.field.id]: customField.value.id,
        };
        await setCustomFieldsRequestSelected(selectedTmp);
      });
    }
  }, [rmaFormData?.custom_fields, customFieldFormData]);

  useEffect(() => {
    if (type === 'update-request' && rmaFormData?.items) {
      rmaFormData?.items.map(item => {
        let custom_fields = {
          field_id: 3,
          value: item.custom_fields[0].value.id,
        };

        setProductsToReturn({
          ...productsToReturn,
          [item.item_id]: {
            ...productsToReturn[item.item_id],
            qty: item.qty_rma,
            custom_fields,
          },
        });
      });
    }
  }, [rmaFormData?.items]);

  useEffect(() => {
    if (rmaFormData?.thread_message) {
      setPostedThreadMessages(rmaFormData?.thread_message);
    }
  }, [rmaFormData?.thread_message]);

  const stateReset = () => {
    setProductsToReturn({});
    setCustomFieldsRequestSelected({});
    setThreadMessage(null);
    setPostedThreadMessages([]);
    setPackageSentStatus(false);
  };

  const onBack = () => {
    setLoading(false);
    stateReset();
    setVisible(false);
    if (type === 'update-request') {
      navigation.goBack();
    }
  };

  const onCancelRequest = async () => {
    try {
      const variables = {
        increment_id: incrementId,
        email: accountInformation.email,
      };
      await cancelReturnRequest({
        variables,
      });
      rxAppSnackbar({
        message: 'Return Request Cancelled',
      });
      onBack();
    } catch (error) {
      rxAppSnackbar({
        message: 'Error in Cancelling Request',
      });
      onBack();
    }
  };

  const onSubmitRequest = async () => {
    setLoading(true);
    const custom_fields = [];
    Object.keys(customFieldsRequestSelected).forEach(field_id => {
      custom_fields.push({
        field_id,
        value: customFieldsRequestSelected[field_id],
      });
    });

    const order_items = [];
    Object.keys(productsToReturn).forEach(item_id => {
      order_items.push({
        item_id,
        qty: productsToReturn[item_id].qty,
        custom_fields: [productsToReturn[item_id].custom_fields],
      });
    });

    if (!order_items.length) {
      rxAppSnackbar({
        message: 'No Item Selected',
      });
      return null;
    }

    try {
      if (type === 'update-request') {
        const variables = {
          increment_id: incrementId,
          customer_email: accountInformation.email,
          custom_fields,
          order_items,
          thread_message: threadMessage,
          update_status: packageSentStatus,
        };
        const res = await updateReturnRequest({
          variables,
        });

        if (!res) {
          setLoading(false);
          return rxAppSnackbar({
            message: 'Failed in Submitting Request',
          });
        }
      } else {
        const variables = {
          order_number: orderNumber,
          customer_name:
            accountInformation.firstname + ' ' + accountInformation.lastname,
          customer_email: accountInformation.email,
          custom_fields,
          order_items,
          thread_message: threadMessage,
        };
        await submitReturnRequest({
          variables,
        });
      }
      rxAppSnackbar({
        message: 'Return Request Submitted',
      });
    } catch (error) {
      rxAppSnackbar({
        message: 'Failed in Submitting Request',
      });
    }
    onBack();
  };

  return (
    <RMAFormModalViews
      type={type}
      visible={visible}
      rmaFormData={rmaFormData}
      orderNumber={orderNumber}
      productsToReturn={productsToReturn}
      setProductsToReturn={setProductsToReturn}
      customFieldsRequestData={customFieldsRequestData}
      customFieldsItemData={customFieldsItemData}
      postedThreadMessages={postedThreadMessages}
      customFieldsRequestSelected={customFieldsRequestSelected}
      setCustomFieldsRequestSelected={setCustomFieldsRequestSelected}
      threadMessage={threadMessage}
      setThreadMessage={setThreadMessage}
      packageSentStatus={packageSentStatus}
      setPackageSentStatus={setPackageSentStatus}
      onSubmitRequest={onSubmitRequest}
      onCancelRequest={onCancelRequest}
      onBack={onBack}
      loading={loading}
    />
  );
}
