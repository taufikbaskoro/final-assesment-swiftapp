import React, {useEffect, useState} from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';
import {useLazyQuery} from '@apollo/client';
import {trimHTMLTags} from '@app/helpers/General';
import {rxAppSnackbar} from '@app/services/cache';
import {GET_CATEGORIES} from '@app/services/queries/category';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {navigateTo} from '@app/helpers/Navigation';

import Button from '@app/components/Button';
import RenderIf from '@app/components/RenderIf';
import Text from '@app/components/Text';
import {modules} from '@root/swift.config';

const NotificationModal = ({notificationData, setNotificationData}) => {
  /**
   * ----------------------------------------- *
   * @constant
   * @summary collections constant
   * ----------------------------------------- *
   */
  const [loadCategories, categoriesData] = useLazyQuery(GET_CATEGORIES);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * ----------------------------------------- *
   * @dependency [categoriesData]
   * @summary set category id and name from
   * remote to local
   * ----------------------------------------- *
   */
  useEffect(() => {
    const checkCategory = (categoryList, category) => {
      setChecked(true);
      categoryList.map(categoryItem => {
        if (categoryItem.url_key === category) {
          setCategoryId(categoryItem.id);
          setCategoryName(categoryItem.name);
        }
        if (categoryId === 0 && categoryItem.children?.length) {
          checkCategory(categoryItem.children, category);
        }
      });
      return categoryId;
    };

    if (categoriesData?.data && notificationData) {
      let category = null;
      category = notificationData.data.path;

      if (category) {
        checkCategory(categoriesData.data.categoryList, category);
      }
    }
  }, [categoriesData]);

  /**
   * ----------------------------------------- *
   * @dependency [categoryId, checked]
   * @summary check category
   * ----------------------------------------- *
   */
  useEffect(() => {
    if (checked) {
      if (categoryId !== 0) {
        setLoading(false);
        navigateTo(modules.product_list.enable, modules.product_list.name, {
          type: 'category',
          categoryId,
          categoryName,
        });
        setNotificationData(null);
      } else {
        setLoading(false);
        rxAppSnackbar({
          message: 'Category Not Found',
        });
      }
    }
  }, [categoryId, checked]);

  /**
   * ----------------------------------------- *
   * @function parseNotificationCustomData
   * @param {object} data
   * @summary check data from notification
   * ----------------------------------------- *
   */
  const parseNotificationCustomData = async data => {
    if (data.type.toLowerCase() === 'category') {
      setLoading(true);
      await loadCategories();
    } else if (data.type.toLowerCase() === 'product') {
      navigateTo(modules.product_detail.enable, modules.product_detail.name, {
        productUrlKey: data.path,
      });
      setNotificationData(null);
    }
  };

  /**
   * ----------------------------------------- *
   * @condition
   * @summary show modal when clicked notification
   * ----------------------------------------- *
   */
  if (notificationData) {
    return (
      <RenderIf condition={notificationData}>
        <Modal
          onRequestClose={() => setNotificationData(null)}
          visible={true}
          transparent>
          <View style={styles.overlayLayer}>
            <View style={styles.modalContainer}>
              <View style={styles.notificationTitleContainer}>
                <Text bold style={styles.notificationTitleText}>
                  {notificationData.data.title}
                </Text>
              </View>
              <RenderIf condition={notificationData.data.image}>
                <Image
                  source={{
                    uri: notificationData.data.image,
                  }}
                  style={styles.imageContainer}
                />
              </RenderIf>
              <Text style={styles.notificationBodyText}>
                {trimHTMLTags(notificationData.data.body)}
              </Text>
              <View style={styles.checkButtonContainer}>
                <RenderIf
                  condition={Object.keys(notificationData?.data).length}>
                  <Button
                    styleProp={[
                      styles.buttonContainer,
                      {backgroundColor: Colors.PRIMARY},
                    ]}
                    textStyleProp={[styles.buttonText, {color: Colors.WHITE}]}
                    label="Check It"
                    loading={loading}
                    onPress={() =>
                      parseNotificationCustomData(notificationData?.data)
                    }
                  />
                </RenderIf>
                <Button
                  styleProp={styles.buttonContainer}
                  textStyleProp={styles.buttonText}
                  label="Close"
                  onPress={() => setNotificationData(null)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </RenderIf>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'flex-end',
    width: normalize(80),
    borderWidth: 0,
    backgroundColor: Colors.GRAY_MEDIUM,
  },
  buttonText: {
    padding: normalize(5),
  },
  checkButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    alignSelf: 'center',
    width: Mixins.MAX_WIDTH * 0.5,
    height: normalize(100),
    resizeMode: 'contain',
  },
  modalContainer: {
    maxHeight: Mixins.MAX_HEIGHT * 0.8,
    maxWidth: Mixins.MAX_WIDTH * 0.8,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(20),
  },
  notificationBodyText: {
    marginVertical: normalize(16),
  },
  notificationTitleContainer: {
    borderColor: 'black',
    borderBottomWidth: 1,
    marginBottom: normalize(10),
    width: normalize(200),
  },
  notificationTitleText: {
    marginBottom: normalize(12),
  },
  overlayLayer: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationModal;
