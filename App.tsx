import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[
          styles.sectionTitle,
        ]} >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Section title="Checked In">
            <Text style={styles.highlight}>this is the home page</Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 16,
    fontStyle: 'normal',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
