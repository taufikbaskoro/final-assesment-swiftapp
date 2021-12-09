import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {normalize} from '@app/styles/mixins';
import {useNavigation} from '@react-navigation/native';

import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import Text from '@app/components/Text';

import Icon from 'react-native-vector-icons/Ionicons';

const NavBar = ({title, hideBack = false, onBack = null, styleProp = {}}) => {
  const navigation = useNavigation();

  const defaultOnBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView>
      <Section centerChildren style={styles.container}>
        <Section row width={Mixins.MAX_WIDTH} style={[styleProp]}>
          <RenderIf condition={!hideBack}>
            <Section
              hmargin={5}
              width={normalize(50)}
              height={normalize(30)}
              onPress={onBack ? onBack : defaultOnBack}>
              <Icon
                name="ios-arrow-back"
                size={normalize(35)}
                color={Colors.GRAY_DARK}
              />
            </Section>
          </RenderIf>
          <Text xlarge alignCenter>
            {title}
          </Text>
        </Section>
      </Section>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: normalize(60),
    ...Mixins.boxShadow('#f2f2f2', 5),
  },
});

export default NavBar;
