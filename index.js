import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, List, ListItem, Card, Button } from 'react-native-elements';

const data = [
    {
        title: 'Example',
        icon: 'directions-walk',
        route: 'Followers',
        url_image: 'https://moodle.htwchur.ch/pluginfile.php/124614/mod_page/content/4/example.jpg'
    },
    {
        title: 'Second Example',
        icon: 'directions-walk',
        route: 'Followers',
        url_image: 'https://t4.ftcdn.net/jpg/00/53/45/31/240_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg'
    },
    {
        title: 'Third Example',
        icon: 'do-not-disturb-on',
        route: 'Blocked',
        url_image: 'https://previews.123rf.com/images/aquir/aquir1504/aquir150401107/39120040-example-grunge-retro-red-isolated-ribbon-stamp.jpg'
    },
]

export default class SearchScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Search',
    })
    constructor(props) {
        super(props)
        this.state = { filterKey: "Seguidores", list: data, noData: true }
    }
    render() {
        const { navigate } = this.props.navigation;
        const FilterList = (e) => {
            let text = e
            let list = this.state.list
            let filteredName = list.filter((item) => {
                return item.title.match(text)
            })
            if (!text || text === '') {
                this.setState({
                    list: data,
                    noData: true
                })
            } else if (!Array.isArray(filteredName) && !filteredName.length) {
                this.setState({
                    noData: true
                })
            } else if (Array.isArray(filteredName)) {
                if ((filteredName.length > 0) == true) {
                    this.setState({
                        noData: false,
                        list: filteredName
                    })
                } else {
                    this.setState({
                        noData: true,
                        list: data
                    })
                }
            }
            console.log(list);
            console.log(this.state.noData);
        }
        return (
            <View style={styles.container}>
                <FormLabel>CEP</FormLabel>
                <FormInput
                    inputStyle={{ textAlign: 'center', width: 100 }}
                    // maxLength={8}
                    onChangeText={(text) => { FilterList(text) }}
                />
                {/* <FormValidationMessage>Error message</FormValidationMessage> */}
                <Text>{this.state.stations}</Text>
                <ScrollView>
                    <List containerStyle={{ marginBottom: 40 }}>
                        {this.state.noData ?
                            <Image
                                source={require('../../images/load.gif')}
                                style={{ margin: 80 }}
                            />
                            :
                            this.state.list.map((item, i) => (
                                <Card
                                    title={item.title}
                                    image={{ uri: item.url_image }}
                                    key={i}
                                >
                                    <Text style={{ marginBottom: 10 }}>
                                        {item.title}
                                    </Text>
                                    <Button
                                        icon={{ name: 'code' }}
                                        backgroundColor='#03A9F4'
                                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        title='Ver' />
                                </Card>
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
