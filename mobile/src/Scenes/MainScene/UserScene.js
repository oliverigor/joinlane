import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Button,
  ScrollView
} from 'react-native';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { ErrorScene } from '../../components';

export default class UserScene extends PureComponent {
  render() {
    const query = gql`
      query User($id: ID!) {
        user(id: $id) {
          id
          color
          name
          email
          image
          friends {
            name
            id
            image
          }
          company
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

    // todo: 5 would be cool to make the user name and email updateable and saved ot the database, so we can let our users change their info.
    return (
      <Query query={query} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return <ErrorScene message={error.message} />;
          }

          return (
            <View style={{ flex: 1 }}>
              <ScrollView>
                <View>
                  <Text style={styles.textName}>Personal Information</Text>
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
                        { borderColor: data.user.color }
                      ]}
                    >
                      <Image
                        style={styles.imageMain}
                        source={{ uri: data.user.image }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.text}>Name: {data.user.name}</Text>
                  <Text style={styles.text}>Email: {data.user.email}</Text>

                  <Text style={styles.textEmail}>Address</Text>
                  <Text style={styles.text}>
                    City: {data.user.address.city}
                  </Text>
                  <Text style={styles.text}>
                    Street: {data.user.address.streetAddress}
                  </Text>
                  <Text style={styles.text}>
                    County: {data.user.address.county}
                  </Text>
                  <Text style={styles.text}>
                    Country: {data.user.address.country}
                  </Text>
                  <Text style={styles.text}>
                    Zip Code: {data.user.address.zipCode}
                  </Text>
                  <Text style={styles.text}>
                    State: {data.user.address.state}
                  </Text>
                </View>
                <View>
                  <Text style={styles.textEmail}>Friends</Text>
                  {data.user.friends &&
                    data.user.friends.map(user => {
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
              <View style={{ marginBottom: 40 }}>
                <Button
                  onPress={() =>
                    navigation.navigate('CompanyScene', {
                      id: data.user.company
                    })
                  }
                  title="Go to user's company"
                />
              </View>
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
