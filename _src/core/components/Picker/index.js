import {Picker} from '@react-native-community/picker';
import React from 'react';
import Text from '@app/components/Text';
import Section from '@app/components/Section';
import {useColorScheme} from 'react-native-appearance';
import {Colors} from '@app/styles';

const CustomPicker = ({
  pickerData,
  selectedValue,
  setSelectedValue,
  enabled = true,
}) => {
  const scheme = useColorScheme();

  return (
    <Section
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text>{pickerData.name} : </Text>
      <Picker
        enabled={enabled}
        selectedValue={selectedValue}
        style={{
          height: 50,
          flex: 1,
          backgroundColor: scheme === 'dark' ? Colors.BLACK : Colors.WHITE,
          color: scheme === 'dark' ? Colors.WHITE : Colors.BLACK,
        }}
        itemStyle={{fontSize: 10}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        {pickerData.items.map(item => (
          <Picker.Item label={item.label} value={item.value} key={item.label} />
        ))}
      </Picker>
    </Section>
  );
};

export default CustomPicker;
