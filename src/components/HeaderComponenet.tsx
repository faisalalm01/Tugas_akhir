import {StyleSheet, View} from 'react-native';
import React from 'react';
import ButtonSecondary from './ButtonSecondary';
import {IconName} from './Icon';
// import {NavigationProps} from '../utils/Navigator';

type Props = {
  pressAdd?: () => void;
  pressNotif?: () => void;
};

const HeaderComponent: React.FC<Props> = ({pressAdd, pressNotif}) => {
  return (
    <View style={styles.container}>
      {/* <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0)"
        translucent
      /> */}
      <View>
        <ButtonSecondary icon={IconName.Ionicons.Add} onPress={pressAdd} />
      </View>
      <View>
        <ButtonSecondary
          icon={IconName.Ionicons.Notification}
          onPress={pressNotif}
        />
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    columnGap: 6,
    paddingBottom: 8,
    paddingTop: 55,
    display: 'flex',
    backgroundColor: '#fff',
  },
});
