import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image
} from 'react-native';
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
          {
            /* console.log({ company: data }); */
          }
          return (
            <View style={{ flex: 1 }}>
              <ScrollView>
                <View>
                  <Text style={styles.textName}>Company Information</Text>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'row',
                      justifyContent: 'center'
                    }}
                  >
                    <View
                      style={[
                        styles.imageWrapperMain,
                        { borderColor: data.company.color }
                      ]}
                    >
                      <Image
                        style={styles.imageMain}
                        source={{ uri: data.company.image }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.text}>Name: {data.company.name}</Text>
                  <Text style={styles.text}>Email: {data.company.email}</Text>

                  <Text style={styles.textEmail}>Address</Text>
                  <Text style={styles.text}>
                    City: {data.company.address.city}
                  </Text>
                  <Text style={styles.text}>
                    Street: {data.company.address.streetAddress}
                  </Text>
                  <Text style={styles.text}>
                    County: {data.company.address.county}
                  </Text>
                  <Text style={styles.text}>
                    Country: {data.company.address.country}
                  </Text>
                  <Text style={styles.text}>
                    Zip Code: {data.company.address.zipCode}
                  </Text>
                  <Text style={styles.text}>
                    State: {data.company.address.state}
                  </Text>
                </View>
                <View>
                  <Text style={styles.textEmail}>Employees</Text>
                  {data.company.employees &&
                    data.company.employees.map(user => {
                      return (
                        <TouchableOpacity
                          key={user.id}
                          onPress={() =>
                            navigation.navigate('UserScene', {
                              id: user.id
                            })
                          }
                        >
                          <View style={styles.UserList}>
                            <View
                              style={[
                                styles.imageWrapper,
                                { borderColor: user.color }
                              ]}
                            >
                              <Image
                                style={styles.image}
                                source={{ uri: user.image }}
                              />
                            </View>
                            <Text style={styles.textImage}>{user.name}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </ScrollView>
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  UserList: {
    flexDirection: 'row',
    padding: 5
  },
  imageWrapper: {
    marginLeft: 30,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 50,
    height: 50,
    overflow: 'hidden'
  },
  imageWrapperMain: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 90,
    height: 90,
    overflow: 'hidden'
  },
  imageMain: {
    width: 90,
    height: 90,
    resizeMode: 'contain'
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },

  textName: {
    textAlign: 'center',
    fontSize: 24
  },
  textEmail: {
    textAlign: 'center',
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    padding: 8
  },
  text: {
    marginLeft: 20,
    marginBottom: 4,
    marginTop: 4
  },
  textImage: {
    marginLeft: 10,
    marginTop: 15
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
  }
});
