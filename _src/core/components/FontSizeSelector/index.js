import {useReactiveVar} from '@apollo/client';
import Section from '@app/components/Section';
import CustomText from '@app/components/Text';
import RenderIf from '@app/components/RenderIf';
import {LARGE, MEDIUM, SMALL} from '@app/helpers/Constants';
import {Storage} from '@app/helpers/Storage';
import {rxUserFontSize} from '@app/services/cache';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import React, {useState} from 'react';
import {Text} from 'react-native';
import RadioButton from '@app/components/RadioButton';
import {useColorScheme} from 'react-native-appearance';

const fontSizeItemList = [SMALL, MEDIUM, LARGE];

const ItemLine = ({selectedFontSize, index}) => {
  const scheme = useColorScheme();
  let inactiveBorderDarkThemeColor =
    scheme === 'dark' ? Colors.WHITE : Colors.BLACK;

  return (
    <Section
      height={normalize(2)}
      border={selectedFontSize ? Colors.PRIMARY : inactiveBorderDarkThemeColor}
      flex
      style={{
        alignSelf: 'center',
        //  marginTop: normalize(25)
        marginBottom: normalize(17),
      }}
    />
  );
};

const FontSizeItem = ({sizeItem, selectedFontSize, setUserFontSize}) => {
  const scheme = useColorScheme();

  const {size, label} = sizeItem;

  return (
    <Section centerChildren vmargin={3} onPress={() => setUserFontSize(size)}>
      <RadioButton
        selected={selectedFontSize === size}
        size={normalize(20)}
        activeColor={Colors.PRIMARY}
      />
      <Text
        style={{
          color: scheme === 'dark' ? Colors.WHITE : Colors.BLACK,
        }}>
        {label[0]}
      </Text>
    </Section>
  );
};

const SampleText = ({selectedFontSize}) => {
  const scheme = useColorScheme();
  return (
    <Section
      width={Mixins.MAX_WIDTH * 0.9}
      radius={25}
      border={Colors.GRAY_MEDIUM}
      centerChildren
      padding2
      vmargin2>
      <Text
        style={{
          fontSize: normalize(16) * selectedFontSize,
          color: scheme === 'dark' ? Colors.WHITE : Colors.BLACK,
        }}>
        The quick brown fox jumps over the lazy dog
      </Text>
    </Section>
  );
};

export default function FontSizeSelector() {
  const userFontSize = useReactiveVar(rxUserFontSize);
  const [selectedFontSize, setSelectedFontSize] = useState(userFontSize);

  const setUserFontSize = size => {
    rxUserFontSize(size);
    setSelectedFontSize(size);
    Storage.set(Storage.name.USER_FONT_SIZE, size);
  };

  return (
    <Section centerChildren alignStart>
      <Section alignStart padding2>
        <CustomText large>Font Size</CustomText>
        <SampleText selectedFontSize={selectedFontSize} />
      </Section>
      <Section centerChildren row width="100%" spaceAround hpadding3 vpadding>
        {fontSizeItemList.map((fontSizeItem, index) => {
          return (
            <>
              <FontSizeItem
                sizeItem={fontSizeItem}
                selectedFontSize={selectedFontSize}
                setUserFontSize={setUserFontSize}
              />
              <RenderIf condition={index !== fontSizeItemList.length - 1}>
                <ItemLine />
              </RenderIf>
            </>
          );
        })}
      </Section>
    </Section>
  );
}
