import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Modal} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import Button from '@app/components/Button';

import ImagePicker from '@app/components/ImagePicker';
import Input from '@app/components/Input';
import NavBar from '@app/components/NavBar';
import Picker from '@app/components/Picker';
import RadioButton from '@app/components/RadioButton';
import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import Divider from '@app/components/Divider';
import Text from '@app/components/Text';

import FastImage from 'react-native-fast-image';
import styles from '@app/_modules/account/atoms/RMAFormModal/styles';

export default function RMAFormModalViews({
  type,
  visible,
  rmaFormData,
  orderNumber,
  productsToReturn,
  setProductsToReturn,
  customFieldsRequestData,
  customFieldsItemData,
  postedThreadMessages,
  customFieldsRequestSelected,
  setCustomFieldsRequestSelected,
  threadMessage,
  setThreadMessage,
  packageSentStatus,
  setPackageSentStatus,
  onSubmitRequest,
  onCancelRequest,
  onBack,
  loading,
}) {
  const scheme = useColorScheme();
  const {t} = useTranslation();

  const Items = ({item}) => {
    const selected = !!productsToReturn[item.item_id];
    const qtyReturnable = item.qty_returnable;

    return (
      <Section
        width={Mixins.MAX_WIDTH * 0.9}
        row
        centerChildren
        radius
        vpadding
        hpadding
        vmargin={5}
        border={Colors.GRAY_LIGHT}>
        <RenderIf condition={item.is_returnable}>
          <RadioButton
            style={{marginRight: normalize(10)}}
            selected={selected}
            onPress={() => {
              if (selected) {
                const productsToReturnTmp = {...productsToReturn};
                delete productsToReturnTmp[item.item_id];
                setProductsToReturn(productsToReturnTmp);
              } else {
                setProductsToReturn({
                  ...productsToReturn,
                  [item.item_id]: {
                    qty: 1,
                    custom_fields: {
                      field_id: 3,
                      value: 1,
                    },
                  },
                });
              }
            }}
          />
        </RenderIf>
        <FastImage
          key={item.item_id}
          style={styles.productImage}
          source={{
            uri: item.image_url,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Section flex alignStart>
          <Text>{item.name}</Text>
          <RenderIf
            condition={
              (item.is_returnable && selected) || type === 'update-request'
            }>
            <Section row centerChildren>
              <Text scaling={false}>Qty to Return : </Text>
              <RenderIf condition={type !== 'update-request'}>
                <Input
                  styleProp={{
                    width: normalize(30),
                  }}
                  textStyleProp={{textAlign: 'center'}}
                  keyboardType="number-pad"
                  value={
                    selected ? productsToReturn[item.item_id].qty.toString() : 0
                  }
                  onChangeText={text => {
                    let qty = '0';
                    if (text !== '') {
                      qty = text;
                    }
                    if (parseInt(text) > qtyReturnable) {
                      qty = qtyReturnable;
                    }
                    setProductsToReturn({
                      ...productsToReturn,
                      [item.item_id]: {
                        ...productsToReturn[item.item_id],
                        qty: parseInt(qty),
                      },
                    });
                  }}
                />
                <Text xsmall>of {qtyReturnable} Returnable</Text>
              </RenderIf>
              <RenderIf condition={type === 'update-request'}>
                <Text>{item.qty_rma}</Text>
              </RenderIf>
            </Section>
            {customFieldsItemData.map(customField => (
              <Picker
                enabled={
                  !rmaFormData.status || rmaFormData.status?.name !== 'Canceled'
                }
                key={customField.name + '' + item.item_id}
                pickerData={customField}
                selectedValue={
                  productsToReturn[item.item_id]?.custom_fields?.value
                }
                setSelectedValue={value => {
                  setProductsToReturn({
                    ...productsToReturn,
                    [item.item_id]: {
                      ...productsToReturn[item.item_id],
                      custom_fields: {
                        field_id: customField.id,
                        value: value,
                      },
                    },
                  });
                }}
              />
            ))}
          </RenderIf>
          <RenderIf condition={type === 'new-request'}>
            <RenderIf
              condition={!item.is_returnable && !item.other_rma_request}>
              <Text>Sorry, this item is not returnable.</Text>
            </RenderIf>
            <RenderIf condition={item.other_rma_request?.length}>
              <Text>
                Other return requests for this product :{' '}
                {item.other_rma_request}
              </Text>
            </RenderIf>
          </RenderIf>
        </Section>
      </Section>
    );
  };

  const HeaderComponent = () => {
    return (
      <>
        <Section vmargin2>
          {customFieldsRequestData.map(customField => (
            <Picker
              enabled={
                !(
                  customField.name === 'Package Condition' &&
                  type === 'update-request'
                ) && rmaFormData.status?.name !== 'Canceled'
              }
              key={customField.name}
              pickerData={customField}
              selectedValue={customFieldsRequestSelected[customField.id]}
              setSelectedValue={value => {
                setCustomFieldsRequestSelected({
                  ...customFieldsRequestSelected,
                  [customField.id]: value,
                });
              }}
            />
          ))}
        </Section>

        <Text alignStart bold>
          Products to Return :
        </Text>
      </>
    );
  };

  // const FooterComponent = () => {
  // Using Function Form to solve issue : auto close keyboard on typing message
  const footerComponent = () => {
    const [showMessages, setShowMessages] = useState(false);

    const handleMessageText = text => {
      setThreadMessage({...threadMessage, text});
    };

    return (
      <>
        <RenderIf condition={postedThreadMessages.length}>
          <Button
            width={normalize(120)}
            label={showMessages ? 'Hide Messages' : 'Show Messages'}
            styleProp={styles.hideMessasgesButton}
            textStyleProp={styles.hideMessasgesButtonText}
            onPress={() => setShowMessages(!showMessages)}
          />

          <RenderIf condition={showMessages}>
            <Section alignStart>
              <Text>Messages : </Text>
              {postedThreadMessages.map(message => {
                const alignStyle = {
                  alignSelf:
                    message.owner_type === 2 ? 'flex-start' : 'flex-end',
                };

                let customermsgBackgroundColor =
                  scheme === 'dark' ? Colors.BLACK : Colors.WHITE;
                let storemsgBackgroundColor =
                  scheme === 'dark' ? Colors.GRAY_DARK : Colors.GRAY_SMOOTH;

                const borderStyle = {
                  borderRadius: normalize(10),
                  alignSelf:
                    message.owner_type === 2 ? 'flex-start' : 'flex-end',
                  backgroundColor:
                    message.owner_type === 2
                      ? storemsgBackgroundColor
                      : customermsgBackgroundColor,
                  borderTopLeftRadius: message.owner_type === 2 ? 0 : 10,
                  borderTopRightRadius: message.owner_type === 2 ? 10 : 0,
                  borderColor: scheme === 'dark' ? Colors.WHITE : Colors.BLACK,
                  borderWidth: 0.5,
                  width: Mixins.MAX_WIDTH * 0.8,
                };

                return (
                  <RenderIf condition={message.text !== ''}>
                    <Text xxsmall style={[alignStyle]}>
                      {message.owner_type === 2
                        ? `${rmaFormData.customer_address.firstname}`
                        : 'Admin'}
                    </Text>
                    <Section
                      style={[borderStyle]}
                      hpadding
                      vpadding={2}
                      vmargin={3}>
                      <RenderIf condition={message.attachments.length}>
                        {message.attachments.map(attachment => {
                          return (
                            <>
                              <Text xxsmall style={[alignStyle]}>
                                {attachment.name}
                              </Text>
                              <FastImage
                                key={attachment.name}
                                style={styles.attachmentImage}
                                source={{
                                  uri: attachment.image_url,
                                  priority: FastImage.priority.normal,
                                  cache: FastImage.cacheControl.immutable,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                              />
                            </>
                          );
                        })}
                      </RenderIf>
                      <Text style={[alignStyle]}>{message.text}</Text>
                      <Text xxsmall style={[alignStyle]}>
                        {message.created_at}
                      </Text>
                    </Section>
                  </RenderIf>
                );
              })}
            </Section>
          </RenderIf>
        </RenderIf>

        <RenderIf condition={rmaFormData.status?.name !== 'Canceled'}>
          <Input
            label="Send a Message"
            placeholder="Type here to add a message to manager"
            multiline={true}
            numberOfLines={10}
            value={threadMessage?.text}
            onChangeText={handleMessageText}
            // onChangeText={(text) => setThreadMessage({...threadMessage, text})}
            styleProp={styles.messageInput}
            // editable={!loading}
          />

          <ImagePicker
            style={{width: '100%'}}
            label={t('label.uploadImage')}
            callback={imageData => {
              const imagePath = imageData.path.split('/');
              const name = imagePath[imagePath.length - 1];
              let file_name = name;
              let file_content_base64 =
                'data:' + imageData.mime + ';base64,' + imageData.data;
              setThreadMessage({
                ...threadMessage,
                attachments: [
                  {
                    file_content_base64,
                    name,
                    file_name,
                  },
                ],
              });
            }}
          />
        </RenderIf>

        <RenderIf
          condition={
            type === 'update-request' && rmaFormData.status?.name !== 'Canceled'
          }>
          <Section row alignCenter style={{marginBottom: normalize(15)}}>
            <RadioButton
              selected={
                rmaFormData?.status?.name === 'Package Sent'
                  ? true
                  : packageSentStatus
              }
              onPress={() => {
                if (rmaFormData?.status?.name !== 'Package Sent') {
                  setPackageSentStatus(!packageSentStatus);
                }
              }}
            />
            <Text style={styles.packageSentText}>Package Sent</Text>
          </Section>
        </RenderIf>

        <Divider />

        <Section
          row
          spaceAround
          centerChildren
          style={{marginBottom: normalize(20)}}>
          <Button
            label={type === 'update-request' ? 'Back' : 'Cancel'}
            onPress={() => onBack()}
          />
          <RenderIf condition={rmaFormData.status?.name !== 'Canceled'}>
            <Button
              loading={loading}
              textStyleProp={{color: Colors.WHITE}}
              styleProp={{
                backgroundColor: Colors.PRIMARY,
                borderColor: Colors.PRIMARY,
              }}
              label={
                type === 'update-request' ? 'Update Request' : 'Submit Request'
              }
              onPress={onSubmitRequest}
            />
          </RenderIf>
        </Section>
        <RenderIf
          condition={
            type === 'update-request' &&
            !packageSentStatus &&
            rmaFormData.status?.name !== 'Canceled'
          }>
          <Button
            width={normalize(120)}
            label="Cancel Return"
            onPress={onCancelRequest}
            styleProp={styles.cancelButton}
          />
        </RenderIf>
      </>
    );
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        onBack();
      }}
      style={[
        styles.mainContainer,
        {
          backgroundColor: scheme === 'dark' ? Colors.BLACK : Colors.WHITE,
        },
      ]}>
      <NavBar title={`New Return for Order ${orderNumber}`} hideBack={true} />
      <FlatList
        ListHeaderComponent={<HeaderComponent />}
        data={rmaFormData?.items ? rmaFormData?.items : []}
        renderItem={Items}
        style={[
          styles.listContainer,
          {backgroundColor: scheme === 'dark' ? Colors.BLACK : Colors.WHITE},
        ]}
        keyExtractor={item => item.item_id.toString()}
        ListFooterComponent={footerComponent()}
      />
    </Modal>
  );
}
