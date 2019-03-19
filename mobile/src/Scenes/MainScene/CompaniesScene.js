import React, { PureComponent } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native';
import { ErrorScene } from '../../components';
import CompaniesList from '../../components/CompaniesList';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const query = gql`
  query Companies {
    companies {
      id
      name
      color
      image
    }
  }
`;

export default class CompaniesScene extends PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }
            {
              /* console.log({ dataComp: data }); */
            }
            return (
              <FlatList
                data={data.companies}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CompanyScene', { id: item.id })
                    }
                  >
                    <CompaniesList company={item} />
                  </TouchableOpacity>
                )}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}
