import {View} from 'native-base';
import React from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {Text} from 'react-native';
import CommentsComp, {Reply} from '../components/CommentsComp';
import {AppColor} from '../shared/appColors';
import {ServiceApi} from '../Api/ServiceApi';
import {useEffect} from 'react';
// const comments = [
//   {
//     id: 1,
//     name: 'Henry Cavil',
//     comment: 'thats badass!',
//     reply: false,
//   },
//   {
//     id: 2,
//     name: 'Millie Bobby Brown',
//     comment: 'Thanks Henry ❤ 2',
//     reply_to: 1,
//     parent_comment_id: 1,
//     reply: true,
//   },
//   {
//     id: 3,
//     name: 'Millie Bobby Brown',
//     comment: 'Thanks Henry ❤ 3',
//     reply_to: 2,
//     parent_comment_id: 1,
//     reply: true,
//   },
//   {
//     id: 4,
//     name: 'Millie Bobby Brown',
//     comment: 'Thanks Henry ❤ 4',
//     // reply_to: 1,
//     // parent_comment_id: 1,
//     reply: false,
//   },
//   {
//     id: 5,
//     name: 'Henry Cavil',
//     comment: 'Hail Anolna 😂1',
//     reply: false,
//   },
//   {
//     id: 6,
//     name: 'Millie Bobby Brown',
//     comment: 'henryyyyyy 😂',
//     reply_to: 5,
//     parent_comment_id: 5,
//     reply: true,
//   },
// ];

const Comments = () => {
  console.log('these are the comments');
  const [comment, setComments] = useState([]);
  const commentsAndTheirReplies = [];
  const serviceApi = new ServiceApi();

  const commentsApi = async () => {
    const allComments = await serviceApi.allComments(13);
    setComments(allComments.data);
    console.log('\n\n\n\n\n\n\n\n these are the comments', allComments);
    console.log(
      '\n\n\n\n\n\n\n\n these are the comments data',
      allComments.data,
    );
    // console.log('\n\n\n\n\n\n\n\n these are the comments', allComments.childCo);
  };

  useEffect(() => {
    commentsApi();
  }, []);

  //   for (let i = 0; i < comments.length; i++) {
  //     for (let j = 0; j < comments.length; j++) {
  //       if (comment[i].id == comments[j].reply_to) {
  //         console.log('\n\n\n\n\n\n\n\n\n', {
  //           comment: comments[i].id,
  //           reply: comments[j].id + '' + comments[j].reply_to,
  //         });
  //       }
  //     }
  //   }

  return (
    <>
      {comment?.map((c, i) => {
        return <>{<CommentsComp comment={c} />}</>;
      })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  formRow: {
    flexDirection: 'row',
    height: 'auto',
  },
  formItem: {
    width: '75%',
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
  },
});
export default Comments;
