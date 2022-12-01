import { View } from 'native-base';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Image, Pressable } from 'react-native';
import { Text } from 'react-native';
import { TextInput } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { ServiceApi } from '../Api/ServiceApi';
import { AppColor } from '../shared/appColors';

const serviceApi = new ServiceApi();
const CommentsComp = ({ comment, setComments }) => {
  // const a = require('../Assets/lady.png');

  const [reply, setReply] = useState(false);
  const [sendReply, setSendReply] = useState('');

  const handleReplies = async () => {
    // const response = await serviceApi.writeComment(sendReply);
    // setComments(comment.childComments[reply, ...comment.childComments])
    if (sendReply != '' && sendReply != null) {

      const dummySendReply = {
        id: Math.random(),
        name: 'New Commnet',
        description: sendReply,
        reply_to: comment.id,
        parent_comment_id: comment.id,
        reply: true,
        likes: Math.floor(Math.random() * 10),
      };
      console.log('dummySendReply:', { dummySendReply }, { comment });

      comment.childComments = [dummySendReply, ...comment.childComments];
      console.log({ 'handle replies': comment });
      // setComments(comment);
      setSendReply('');
      // console.log('response', response);}

    }
    else {
      console.log("HANDLE REPLIES DOESNT HANDLE EMPTY COMMENTS")
    }

  };

  const handleLikes = async (data) => {
    const likeResposne = await serviceApi.likePostOrComment(data);
    console.log("likeResposne",{likeResposne})
    // console.log("likeResposne", { data })
  }

  useEffect(() => {
    console.log('reply: ', reply);
  }, [setReply]);
  useEffect(() => {
    console.log('send reply: ', sendReply);
  }, [setSendReply, handleReplies]);

  return (
    <>
      <View style={styles.container} key={key}>
        <View style={styles.formRow}>
          <View style={styles.formIcon}>
            <View style={[styles.imageView]}>
              <Image
                source={require('../Assets/watch2.png')}
                style={[styles.image]}
              />
            </View>
          </View>
          <View style={[styles.formItem]}>
            <View style={[styles.name]}>
              <Text style={[styles.text, { fontWeight: '700' }]}>
                {comment.user_id}
              </Text>
              <Text style={[{ color: 'lightgrey' }]}>3h</Text>
            </View>
            <Text style={[styles.text, { marginTop: 10 }]}>
              {comment.description}
            </Text>
            <View style={[styles.like]}>
              <View>
                <View style={[{ flexDirection: 'row' }]}>
                  <Pressable style={[{ color: 'lightgrey' }]} onPress={() => handleLikes({ post_id: comment.post_id, comment_id: comment.comment_id })}>
                    <Text>
                      Like {comment.likes}
                    </Text>
                  </Pressable >
                  <Pressable onPress={() => setReply(!reply)} style={[{ color: 'lightgrey', marginLeft: 10 }]}>
                    <Text >
                      Reply
                    </Text>
                  </Pressable>
                </View>
                <View style={[replyTo.con, { width: 230, borderRadius: 100 }]}>
                  {reply == true && (
                    <>
                      <ReplyTo sendReply={sendReply} setSendReply={setSendReply} />
                      <Text
                        onPress={() => handleReplies()}
                        style={[{ color: 'black' }]}>
                        Send
                      </Text>
                    </>
                  )}
                </View>
              </View>
              <View>
                <Text
                  style={[
                    { color: 'lightgrey', fontSize: 16, fontWeight: '700' },
                  ]}>
                  ...
                </Text>
              </View>
            </View>
          </View>
        </View>
        {comment.childComments.length > 0 &&
          comment.childComments?.map((c, i) => {
            return (
              <View style={[{ marginLeft: 50 }]}>
                <Reply comment={c} key={i} />
              </View>
            );
          })}
      </View>
    </>
  );
};



const ReplyTo = ({ sendReply, setSendReply }) => {
  return (
    <View
      style={[
        replyTo.container,
        {
          borderRadius: 100,
          marginTop: 10,
          height: 40,
          paddingLeft: 10,
          width: '100%',
        },
      ]}>
      <TextInput
        value={sendReply}
        placeholder="Reply"
        placeholderTextColor={AppColor.lightGray}
        style={[{ color: AppColor.dark }]}
        onChangeText={text => {
          console.log(text.length)
          if (text == '' && text == null) {

            console.log("EMPTY COMMENT")
          }
          else {
            setSendReply(text)
          }
        }
        }
      ></TextInput>
    </View>
  );
};


export const Reply = ({ comment, key }) => {
  // const [reply, setReply] = useState(true);
  const handleLikes = async (data) => {
    const likeResposne = await serviceApi.likePostOrComment(data);
    console.log("likeResposne",{likeResposne})
    // console.log("likeResposne", { data })
  }
  return (
    <View style={[styles.container, { marginLeft: 0, padding: 0 }]} key={key}>
      <View style={styles.formRow}>
        <View style={styles.formIcon}>
          <View style={[styles.imageView]}>
            <Image
              source={require('../Assets/watch2.png')}
              style={[styles.image]}
            />
          </View>
        </View>
        <View style={[styles.formItem]}>
          <View style={[styles.name]}>
            <Text style={[styles.text, { fontWeight: '700' }]}>
              {/* {comment.name} */}
              {comment.user_id}
            </Text>
            <Text style={[{ color: 'lightgrey' }]}>3h</Text>
          </View>
          <Text style={[styles.text, { marginTop: 10 }]}>
            {comment.description}
          </Text>
          <View style={[styles.like]}>
            <View>
              <View style={[{ flexDirection: 'row' }]}>
              <Pressable style={[{ color: 'lightgrey' }]} onPress={() => handleLikes({ post_id: comment.post_id, comment_id: comment.comment_id })}>
                    <Text>
                      Like {comment.likes}
                    </Text>
                  </Pressable >
              </View>
            </View>
            <View>
              <Text
                style={[{ color: 'lightgrey', fontSize: 16, fontWeight: '700' }]}>
                ...
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  formRow: {
    flexDirection: 'row',
    height: 'auto',
  },
  formItem: {
    width: '85%',
    flex: 0,
    backgroundColor: '#F2F2F2',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
    padding: 15,
  },
  formIcon: {
    width: 50,
    // backgroundColor: 'greenyellow',
  },
  image: {
    borderRadius: 100000,
    width: 40,
    height: 40,
  },
  imageView: {
    height: 'auto',
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10000,
  },
  text: {
    color: 'black',
  },
  name: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  like: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
});

const replyTo = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 30,
    width: 100,
  },
  input: {
    height: 50,
    width: '100%',
  },
});
export default CommentsComp;
