import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { ErrorScene } from '../../components';

export default class CompanyScene extends PureComponent {
  render() {
    const query = gql`
      query Company($id: ID!) {
        company(id: $id) {
          color
          image
          name
          suffice
          employees {
            name
          }
          address {
            zipCode
            city
            cityPrefix
            citySuffix
            streetName
            streetAddress
            streetSuffix
            streetPrefix
            secondaryAddress
            county
            country
            state
            latitude
            longitude
          }
        }
      }
    `;
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    // todo: 3. would be extra cool to show the employee list and make it navigate to that user on tap.
    return (
      <Query query={query} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return <ErrorScene message={error.message} />;
          }
          console.log({ company: data });
          return (
            <View>
              <Text>{data.company.name}</Text>
              {/* <Text>{data}</Text>
              <Text>{data.user.email}</Text>
              {data.user.friends &&
                data.user.friends.map(user => {
                  return (
                    <View>
                      <Text>{user.id}</Text>
                      <Text>{user.name}</Text>
                    </View>
                  );
                })} */}
            </View>
          );
        }}
      </Query>
    );
  }
}
