import Text from '@app/components/Text';
import Section from '@app/components/Section';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '@app/components/Button';
import styles from '@app/components/ImagePicker/styles';

const ImagePickerComponent = ({label, callback, style}) => {
  const {t} = useTranslation();

  const [image, setImage] = useState({uri: null});

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      includeBase64: true,
      cropping: true,
    }).then(imageParam => {
      callback(imageParam);
      setImage({uri: imageParam.path});
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      includeBase64: true,
      cropping: true,
    }).then(imageParam => {
      callback(imageParam);
      setImage({uri: imageParam.path});
    });
  };

  return (
    <Section centerChildren maxWidth vpadding spaceBetween style={style}>
      <Text alignStart>{label}</Text>
      <Section width="100%" row spaceAround centerChildren vpadding>
        <Button
          label={t('label.openGallery')}
          onPress={() => openGallery()}
          styleProp={styles.buttonOpen}
          textStyleProp={styles.buttonText}
        />
        <Button
          label={t('label.openCamera')}
          onPress={() => openCamera()}
          styleProp={styles.buttonOpen}
          textStyleProp={styles.buttonText}
        />
      </Section>
      {image.uri !== null && (
        <View style={styles.framePreview}>
          <Image source={image} style={styles.imagePreview} />
        </View>
      )}
    </Section>
  );
};

export default ImagePickerComponent;
