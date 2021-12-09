import React, {useState} from 'react';
import {useColorScheme} from 'react-native-appearance';
import {WebView} from 'react-native-webview';
import {formatDateTime} from '@app/helpers/General';
import {rxAppSnackbar} from '@app/services/cache';
import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {ActivityIndicator} from 'react-native-paper';
import {Modal, SafeAreaView, TouchableOpacity} from 'react-native';

import Button from '@app/components/Button';
import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import Text from '@app/components/Text';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from '@app/_modules/account/atoms/ShippingDetail/styles';

const LiveTrackingWebView = ({
  liveTrackingUrl,
  showLiveTrackModal,
  setShowLiveTrackModal,
  liveTrackLoading,
  setLiveTrackLoading,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showLiveTrackModal}
      onRequestClose={() => {
        setShowLiveTrackModal(false);
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.WHITE,
        }}>
        <Section centerChildren style={{flex: 1}}>
          <Section centerChildren style={[styles.container]}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setShowLiveTrackModal(false)}>
              <Icon
                name="ios-arrow-back"
                size={normalize(35)}
                color={Colors.GRAY_DARK}
              />
            </TouchableOpacity>
            <Section style={styles.titleContainer}>
              <Text bold xlarge>
                Live Tracking
              </Text>
            </Section>
          </Section>
          <RenderIf condition={liveTrackLoading}>
            <Section centerChildren style={styles.loadingContainer}>
              <ActivityIndicator color={Colors.PRIMARY} />
            </Section>
          </RenderIf>
          <WebView
            onLoadEnd={() => setLiveTrackLoading(false)}
            onError={() => {
              setLiveTrackLoading(false);
              setShowLiveTrackModal(false);
              rxAppSnackbar({
                message: 'Error Loading Live Tracking URL',
              });
            }}
            source={{uri: liveTrackingUrl}}
            style={{flex: 1}}
          />
        </Section>
      </SafeAreaView>
    </Modal>
  );
};

const ShippingDetail = ({shipping_description, shipping_detail}) => {
  const scheme = useColorScheme();

  const [showLiveTrackModal, setShowLiveTrackModal] = useState(false);
  const [liveTrackLoading, setLiveTrackLoading] = useState(false);

  if (!shipping_detail[0].data_detail) {
    return null;
  }

  if (
    shipping_detail[0]?.data_detail.includes(
      'Sorry, There is no Tracking Available.',
    )
  ) {
    return <Text>{shipping_detail[0]?.data_detail}</Text>;
  }

  const isGosend = shipping_description.toLowerCase().includes('go-send');
  const dataDetail = [];
  shipping_detail.map(detail => {
    const dataDetailString = detail.data_detail
      .replace(/\\t/g, '')
      .replace(/'/g, '"');
    dataDetail.push(JSON.parse(dataDetailString));
  });

  if (isGosend) {
    return (
      <Section>
        {dataDetail.map(data => {
          const {
            orderNo,
            driverId,
            driverName,
            driverPhone,
            driverPhoto,
            vehicleNumber,
            receiverName,
            orderCreatedTime,
            orderDispatchTime,
            orderArrivalTime,
            orderClosedTime,
            sellerAddressName,
            sellerAddressDetail,
            buyerAddressName,
            buyerAddressDetail,
            liveTrackingUrl,
          } = data;

          return (
            <Section
              backgroundColor={
                scheme === 'dark' ? Colors.GRAY_DARK : Colors.GRAY_LIGHT
              }>
              <Section radius alignStart hpadding vpadding2 vmargin>
                <Section alignStart>
                  <Text bold>Order No : {orderNo} </Text>

                  <RenderIf condition={driverId}>
                    <Text>Driver ID : {driverId}</Text>
                  </RenderIf>
                  <RenderIf condition={driverName}>
                    <Text>Driver Name : {driverName}</Text>
                  </RenderIf>
                  <RenderIf condition={driverPhone}>
                    <Text>Driver Phone : {driverPhone}</Text>
                  </RenderIf>
                  <RenderIf condition={driverPhoto}>
                    <Text>Driver Photo : {driverPhoto}</Text>
                  </RenderIf>
                  <RenderIf condition={vehicleNumber}>
                    <Text>Vehicle Number : {vehicleNumber}</Text>
                  </RenderIf>
                  <RenderIf condition={receiverName}>
                    <Text>Received By : {receiverName}</Text>
                  </RenderIf>

                  <RenderIf condition={orderCreatedTime}>
                    <Text>
                      Order Created Time : {formatDateTime(orderCreatedTime)}
                    </Text>
                  </RenderIf>
                  <RenderIf condition={orderDispatchTime}>
                    <Text>
                      Order Dispatch Time : {formatDateTime(orderDispatchTime)}
                    </Text>
                  </RenderIf>
                  <RenderIf condition={orderArrivalTime}>
                    <Text>
                      Order Arrival Time : {formatDateTime(orderArrivalTime)}
                    </Text>
                  </RenderIf>
                  <RenderIf condition={orderClosedTime}>
                    <Text>
                      Order Closed Time : {formatDateTime(orderClosedTime)}
                    </Text>
                  </RenderIf>
                </Section>

                <Section alignStart vmargin>
                  <Text bold>Seller : </Text>
                  <Text>{sellerAddressName}</Text>
                  <Text>{sellerAddressDetail}</Text>
                </Section>

                <Section alignStart vmargin>
                  <Text bold>Buyer : </Text>
                  <Text>{buyerAddressName}</Text>
                  <Text>{buyerAddressDetail}</Text>
                </Section>

                <Button
                  label="Track Order"
                  onPress={() => {
                    setLiveTrackLoading(true);
                    setShowLiveTrackModal(true);
                  }}
                  styleProp={styles.trackButton}
                  textStyleProp={{color: Colors.WHITE, fontWeight: 'bold'}}
                />
              </Section>

              <LiveTrackingWebView
                liveTrackingUrl={liveTrackingUrl}
                showLiveTrackModal={showLiveTrackModal}
                setShowLiveTrackModal={setShowLiveTrackModal}
                liveTrackLoading={liveTrackLoading}
                setLiveTrackLoading={setLiveTrackLoading}
              />
            </Section>
          );
        })}
      </Section>
    );
  } else {
    return (
      <Section radius>
        {dataDetail.map(data => {
          return (
            <Section padding radius vmargin alignStart>
              <Text style={[styles.marginSpacingBottom]}>{data.name}</Text>
              <Text style={[styles.marginSpacingBottom]}>
                {data.description}{' '}
              </Text>

              <Section row spaceBetween>
                <Section row>
                  <Text small>Updated By : </Text>
                  <Text small>{data.updatedBy}</Text>
                </Section>
                <Text small>{formatDateTime(data.updateDate)}</Text>
              </Section>
            </Section>
          );
        })}
      </Section>
    );
  }
};

export default ShippingDetail;
