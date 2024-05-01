import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import ButtonSecondary from './ButtonSecondary';
import {IconName} from './Icon';

const HeaderComponenet = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0)"
        translucent
      />
      <View>
        <ButtonSecondary icon={IconName.Ionicons.Add} />
      </View>
      <View>
        <ButtonSecondary icon={IconName.Ionicons.Notification} />
      </View>
    </View>
  );
};

export default HeaderComponenet;

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
