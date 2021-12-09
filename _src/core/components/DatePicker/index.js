import DateTimePicker from '@react-native-community/datetimepicker';
import Text from '@app/components/Text';
import Section from '@app/components/Section';
import React, {useState} from 'react';
import DateHelper from '@app/helpers/Date';

const DatePicker = ({label = '', mode = 'date', callback}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    callback(DateHelper.convert(currentDate, '/', {reverse: true}));
  };

  return (
    <Section row spaceBetween width="100%" hpadding vpadding centerChildren>
      <Text>{label}</Text>
      <Section
        border
        radius
        vpadding={5}
        hpadding
        onPress={() => setShow(true)}>
        <Text>{DateHelper.convert(date, ' ', {useMonthString: true})}</Text>
      </Section>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          onChange={onDateChange}
        />
      )}
    </Section>
  );
};

export default DatePicker;
