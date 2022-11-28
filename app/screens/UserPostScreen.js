import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {IconButton} from 'react-native-paper';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from '../components/LoaderComponent';
import moment from 'moment';

function UserPostScreen(props) {
  const {navigation, route} = props;
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();
  const [commentRply, setCommentRply] = useState();
  const {item} = route.params;
  console.log('userComments', item);

  let postImage = item.url[0].url;

  useEffect(() => {
    getAllComments();
  }, []);

  const inputText = useRef();

  const getAllComments = async () => {
    showLoader();
    var result = await new ServiceApi().allComments(item?.post_id);
    console.log('getAllComments', result);
    if (result && result.data) {
      hideLoader();
      setComments(result.data);
    } else {
      hideLoader();
      // alert('Something went wrong');
    }
  };

  const postaComment = async data => {
    showLoader();
    var result = await new ServiceApi().writeComment(data);
    console.log('postaComment', result);
    if (result && result.data) {
      hideLoader();
      getAllComments();
    } else {
      hideLoader();
      // alert('Something went wrong');
    }
  };

  const CommentView = ({item}) => {
    return (
      <View
        style={[
          GlobalStyles.flexRow,
          {
            paddingHorizontal: 15,
            marginTop: 15,
            // marginBottom: 35,
            // backgroundColor: 'red',
          },
        ]}>
        {item.parent_comment_id == 0 && (
          <Image
            source={require('../Assets/notificationImge.png')}
            style={{width: 35, height: 35, borderRadius: 25}}
          />
        )}

        <View style={{width: '100%'}}>
          {item.parent_comment_id == 0 && (
            <View
              style={{
                backgroundColor: AppColor.lightGray2,
                padding: 10,
                marginLeft: 10,
                borderRadius: 10,
                width: '90%',
              }}>
              <View
                style={[
                  GlobalStyles.flexRow,
                  {alignItems: 'center', justifyContent: 'space-between'},
                ]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: AppColor.black,
                  }}>
                  Noah
                </Text>
                <Text
                  style={{
                    color: AppColor.lightGray,
                    fontSize: 13,
                    marginRight: 11,
                  }}>
                  {moment(item?.created_at).format('hh') + 'h'}
                </Text>
              </View>

              <Text
                numberOfLines={2}
                style={{color: AppColor.black, fontSize: 13, marginLeft: 5}}>
                {item?.description}
              </Text>
              <View
                style={[
                  GlobalStyles.flexRow,
                  {alignItems: 'center', paddingHorizontal: 10, marginTop: 5},
                ]}>
                <Text style={{color: AppColor.lightGray, fontSize: 13}}>
                  Like
                </Text>
                <View style={{width: '85%'}}>
                  <Pressable
                    onPress={() => {
                      let mapCommnts = {
                        post_id: item.post_id,
                        id: item.id,
                        user_id: item.user_id,
                      };
                      console.log('mapCommnts', mapCommnts);
                      inputText.current.focus();
                      setCommentRply(mapCommnts);
                    }}>
                    <Text
                      style={{
                        color: AppColor.lightGray,
                        fontSize: 13,
                        marginLeft: 15,
                      }}>
                      Reply
                    </Text>
                  </Pressable>
                </View>
                <Icon
                  name="dots-horizontal"
                  size={20}
                  color={AppColor.lightGray}
                />
              </View>
            </View>
          )}

          {item?.childComments.map(childComments => (
            <View
              style={[
                GlobalStyles.flexRow,
                {
                  paddingHorizontal: 15,
                  marginTop: 5,
                  // alignSelf: 'flex-end',
                  marginTop: 10,
                },
              ]}>
              <Image
                source={require('../Assets/notificationImge.png')}
                style={{width: 35, height: 35, borderRadius: 25}}
              />

              <View
                style={{
                  backgroundColor: AppColor.lightGray2,
                  padding: 10,
                  marginLeft: 10,
                  borderRadius: 10,
                  width: '80%',
                }}>
                <View
                  style={[
                    GlobalStyles.flexRow,
                    {alignItems: 'center', justifyContent: 'space-between'},
                  ]}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: AppColor.black,
                    }}>
                    Noah
                  </Text>
                  <Text
                    style={{
                      color: AppColor.lightGray,
                      fontSize: 13,
                      marginRight: 11,
                    }}>
                    {moment(childComments?.created_at).format('hh') + 'h'}
                  </Text>
                </View>

                <Text style={{color: AppColor.black, fontSize: 13}}>
                  {childComments?.description}
                </Text>
                <View
                  style={[
                    GlobalStyles.flexRow,
                    {
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      marginTop: 5,
                      justifyContent: 'space-between',
                    },
                  ]}>
                  <Text style={{color: AppColor.lightGray, fontSize: 13}}>
                    Like
                  </Text>
                  {/* <View style={{width: '81%'}}>
                    <Pressable
                      onPress={() => {
                        let mapCommnts = {
                          post_id: item.post_id,
                          id: item.id,
                          user_id: item.user_id,
                        };
                        console.log('rplyCommnts', mapCommnts);
                        inputText.current.focus();
                        setCommentRply(mapCommnts);
                      }}>
                      <Text
                        style={{
                          color: AppColor.lightGray,
                          fontSize: 13,
                          marginLeft: 15,
                        }}>
                        Reply
                      </Text>
                    </Pressable>
                  </View> */}
                  <Icon
                    name="dots-horizontal"
                    size={20}
                    color={AppColor.lightGray}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{position: 'relative'}}>
      <ScrollView>
        <View style={[GlobalStyles.container]}>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 0,
              height: 60,
              backgroundColor: AppColor.white,
            }}>
            <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
              <Image
                source={{uri: item?.profile_image}}
                style={styles.userImage}
              />
            </View>
          </View>
          <View style={[GlobalStyles.flexRow, styles.header]}>
            <Icon
              name="arrow-left"
              size={20}
              color={AppColor.black}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.userName2}>
              {item?.first_name + ' ' + item?.last_name}
            </Text>

            <Image
              source={require('../Assets/search.png')}
              style={[GlobalStyles.iconeStyle, {marginRight: 10}]}
            />
          </View>

          <View style={styles.userPost}>
            <View
              style={[
                GlobalStyles.flexRow,
                {marginTop: 10, paddingHorizontal: 15, alignItems: 'center'},
              ]}>
              <Image
                source={{uri: item?.profile_image}}
                style={styles.userImage}
              />
              <Text style={styles.userName}>
                {item?.first_name + ' ' + item?.last_name}
              </Text>

              <View>
                <Menu>
                  <MenuTrigger>
                    <Icon
                      name="dots-horizontal"
                      size={20}
                      color={AppColor.lightGray}
                    />
                  </MenuTrigger>

                  <MenuOptions
                    customStyles={{
                      // optionWrapper: {marginLeft: 10, marginRight: 10},
                      optionsContainer: {
                        width: 140,

                        marginLeft: -5,
                        marginTop: 15,
                        borderRadius: 8,
                        paddingLeft: 10,
                        backgroundColor: 'rgba(242, 245, 243,0.9)',
                        paddingBottom: 15,
                      },
                    }}>
                    <MenuOption
                      customStyles={{
                        optionText: {
                          color: AppColor.darkGray,
                          fontSize: 12,
                        },
                      }}
                      style={{
                        padding: 5,
                        // borderBottomColor: AppColor.separator,
                        // borderBottomWidth: 1,
                      }}
                      onSelect={() => {}}
                      text="Save Photo"
                    />
                    <MenuOption
                      customStyles={{
                        optionText: {
                          color: AppColor.darkGray,
                          fontSize: 12,
                        },
                      }}
                      style={{
                        padding: 5,
                        // borderBottomColor: AppColor.separator,
                        // borderBottomWidth: 1,
                      }}
                      onSelect={() => {}}
                      text="Unfollow User"
                    />
                    <MenuOption
                      customStyles={{
                        optionText: {
                          color: AppColor.darkGray,
                          fontSize: 12,
                        },
                      }}
                      style={{
                        padding: 5,

                        // borderBottomColor: AppColor.separator,
                        // borderBottomWidth: 1,
                      }}
                      onSelect={() => {}}
                      text="Hide Post"
                    />
                    <MenuOption
                      customStyles={{
                        optionText: {
                          color: AppColor.darkGray,
                          fontSize: 12,
                        },
                      }}
                      style={{
                        padding: 5,
                        // borderBottomColor: AppColor.separator,
                        // borderBottomWidth: 1,
                      }}
                      onSelect={() => {}}
                      text="Report Post"
                    />
                  </MenuOptions>
                </Menu>
              </View>
            </View>
            {/* <Pressable onPress={() => navigation.navigate('userPost')}> */}
            <Image source={{uri: postImage}} style={styles.userPostImage} />
            {/* </Pressable> */}
            <View
              style={[
                GlobalStyles.flexRow,
                {
                  alignItems: 'center',
                  paddingHorizontal: 5,
                  paddingTop: 10,
                  height: 30,
                  // backgroundColor: 'red',
                },
              ]}>
              <Pressable onPress={() => {}}>
                <View
                  style={[
                    GlobalStyles.flexRow,
                    {alignItems: 'center', marginLeft: -8},
                  ]}>
                  <IconButton
                    icon="cards-heart-outline"
                    size={20}
                    color={AppColor.darkGray}
                    onPress={() => {}}
                  />
                  <Text style={styles.likes}>{item?.likeCount}</Text>
                </View>
              </Pressable>
              <View
                style={[
                  GlobalStyles.flexRow,
                  {
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: Dimensions.get('window').width / 1.15,
                    height: 30,
                    // backgroundColor: 'blue',
                    marginLeft: 5,
                  },
                ]}>
                <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
                  <IconButton
                    icon={require('../Assets/message2.png')}
                    size={20}
                    color={AppColor.darkGray}
                    onPress={() => {
                      navigation.navigate('userPost', {item: item});
                    }}
                  />
                  {/* <Image
                  source={require('../Assets/message2.png')}
                  style={styles.message}
                /> */}
                  <Text style={styles.likes}>{' ' + item?.commentsCount}</Text>
                </View>

                <Icon
                  name="share-variant-outline"
                  size={20}
                  color={AppColor.darkGray}
                />
              </View>
            </View>

            <Pressable onPress={() => navigation.navigate('userPost')}>
              <View style={styles.postText}>
                <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
                  <Text style={{fontWeight: 'bold', color: AppColor.darkGray}}>
                    {'Lorem '}
                  </Text>
                  <Text
                    style={{
                      color: AppColor.darkGray,
                    }}>
                    {'ipsum dolor sit amet, consectetur adipiscing elit, sed '}
                  </Text>
                </View>
                <Text
                  style={{
                    color: AppColor.darkGray,
                  }}>
                  {
                    'do eiusmodipsum dolor sit amet, consectetur adipiscing elit,'
                  }
                </Text>
                <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
                  <Text style={{color: AppColor.darkGray}}>
                    {'sed do eiusmod '}
                  </Text>
                  <Text
                    style={{
                      color: AppColor.greenButton,
                    }}>
                    {'#Lorem'}
                  </Text>
                </View>
              </View>
            </Pressable>

            <View style={{marginBottom: 65}}>
              <FlatList data={comments} renderItem={CommentView} />
            </View>

            {/* <View
            style={[
              GlobalStyles.flexRow,
              {paddingHorizontal: 15, marginTop: 15},
            ]}>
            <Image
              source={item?.userProfile}
              style={{width: 35, height: 35, borderRadius: 25}}
            />
            <View style={{width: '100%'}}>
              <View
                style={{
                  backgroundColor: AppColor.lightGray2,
                  padding: 10,
                  marginLeft: 10,
                  borderRadius: 10,
                  width: '90%',
                }}>
                <View
                  style={[
                    GlobalStyles.flexRow,
                    {alignItems: 'center', justifyContent: 'space-between'},
                  ]}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: AppColor.black,
                    }}>
                    Noah
                  </Text>
                  <Text
                    style={{
                      color: AppColor.lightGray,
                      fontSize: 13,
                      marginRight: 11,
                    }}>
                    3h
                  </Text>
                </View>
                <Text
                  numberOfLines={2}
                  style={{color: AppColor.black, fontSize: 13}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore
                </Text>
                <View
                  style={[
                    GlobalStyles.flexRow,
                    {alignItems: 'center', paddingHorizontal: 10, marginTop: 5},
                  ]}>
                  <Text style={{color: AppColor.lightGray, fontSize: 13}}>
                    Like
                  </Text>
                  <Text
                    style={{
                      color: AppColor.lightGray,
                      fontSize: 13,
                      marginLeft: 15,

                      width: '82%',
                    }}>
                    Reply
                  </Text>
                  <Icon
                    name="dots-horizontal"
                    size={20}
                    color={AppColor.lightGray}
                  />
                </View>
              </View>

              <View
                style={[
                  GlobalStyles.flexRow,
                  {paddingHorizontal: 15, marginTop: 15},
                ]}>
                <Image
                  source={item?.userProfile}
                  style={{width: 35, height: 35, borderRadius: 25}}
                />

                <View
                  style={{
                    backgroundColor: AppColor.lightGray2,
                    padding: 10,
                    marginLeft: 10,
                    borderRadius: 10,
                    width: '80%',
                  }}>
                  <View
                    style={[
                      GlobalStyles.flexRow,
                      {alignItems: 'center', justifyContent: 'space-between'},
                    ]}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                        color: AppColor.black,
                      }}>
                      Noah
                    </Text>
                    <Text
                      style={{
                        color: AppColor.lightGray,
                        fontSize: 13,
                        marginRight: 11,
                      }}>
                      3h
                    </Text>
                  </View>
                  <Text style={{color: AppColor.black, fontSize: 13}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore
                  </Text>
                  <View
                    style={[
                      GlobalStyles.flexRow,
                      {
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        marginTop: 5,
                      },
                    ]}>
                    <Text style={{color: AppColor.lightGray, fontSize: 13}}>
                      Like
                    </Text>
                    <Text
                      style={{
                        color: AppColor.lightGray,
                        fontSize: 13,
                        marginLeft: 15,

                        width: '76%',
                      }}>
                      Reply
                    </Text>
                    <Icon
                      name="dots-horizontal"
                      size={20}
                      color={AppColor.lightGray}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View> */}
          </View>
          {loaderVisible && (
            <Loader
              loaderVisible={loaderVisible}
              setLoaderVisible={setLoaderVisible}
            />
          )}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255,0.8)',
          bottom: 0,
          height: 70,
          // paddingHorizontal: 15,
        }}>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: AppColor.lightGray2,
            marginHorizontal: 15,
            marginTop: 10,
          }}
        />
        <View
          style={[
            GlobalStyles.flexRow1,
            {
              paddingVertical: 10,
              backgroundColor: AppColor.white,
              paddingHorizontal: 15,
              // width: '100%',
            },
          ]}>
          <Image
            source={{uri: item?.profile_image}}
            style={styles.userImage2}
          />
          <TextInput
            style={styles.whatsNewText}
            placeholderTextColor={AppColor.lightGray}
            onChangeText={value => {
              setNewComment(value);
            }}
            ref={inputText}
            value={newComment}
            placeholder="Write a comment..."
          />
          <IconButton
            icon={'send-outline'}
            size={23}
            color={AppColor.greenButton}
            onPress={() => {
              let mapCommntPostId = comments.map(x => x.post_id)[0];
              if (commentRply && newComment) {
                let postRpyComment = {
                  description: newComment,
                  post_id: item?.post_id,
                  reply_to: commentRply.user_id,
                  parent_comment_id: commentRply.id,
                };

                postaComment(postRpyComment);
                setNewComment(null);
              } else if (newComment) {
                let postComment = {
                  description: newComment,
                  post_id: item?.post_id,
                  reply_to: 0,
                  parent_comment_id: 0,
                };
                console.log('postComment', postComment);
                postaComment(postComment);
                setNewComment(null);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: AppColor.white,
  },
  userName2: {
    color: AppColor.black,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    width: '87%',
    // backgroundColor: 'red',
  },
  likes: {
    color: AppColor.darkGray,
    fontSize: 11,
    marginLeft: -8,
  },
  message: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
  },
  postText: {
    marginTop: 10,
    position: 'relative',
    paddingHorizontal: 15,
  },
  //   transparentView: {
  //     position: 'absolute',
  //     bottom: 0,
  //     backgroundColor: 'rgba(255, 255, 255,0.7)',
  //     width: '100%',
  //     height: 35,
  //   },
  userPost: {
    width: '100%',
    backgroundColor: AppColor.white,
    paddingVertical: 5,
    // borderRadius: 20,
    marginTop: 5,

    // height: Dimensions.get('window').height / 1.6,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
  userImage2: {
    height: 35,
    width: 35,
    borderRadius: 25,
  },
  userPostImage: {
    width: '100%',
    height: Dimensions.get('window').height / 1.8,
    marginTop: 5,
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
    color: AppColor.darkGray,
    fontWeight: 'bold',
    width: '80%',
    // backgroundColor: 'red',
  },
  // whatsNewText: {
  //   color: AppColor.lightGray,
  //   fontWeight: '500',
  //   marginLeft: 10,
  //   fontSize: 16,
  //   width: '80%',
  // },
  whatsNew: {
    backgroundColor: AppColor.white,
    width: '100%',
    height: 60,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 30,
    marginTop: 15,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  whatsNewImage: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
  whatsNewText: {
    color: AppColor.lightGray,
    // backgroundColor: 'red',
    fontWeight: '500',
    marginLeft: 10,
    fontSize: 16,
    width: '80%',
  },
});

export default UserPostScreen;
