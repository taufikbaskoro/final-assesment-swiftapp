import React, {useState} from 'react';
import {Modal, ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {ADD_PRODUCT_REVIEW} from '@app/_modules/product_detail/services/schema';
import {useMutation} from '@apollo/client';
import {withProfiler} from '@sentry/react-native';
import {Colors} from '@app/styles';
import {rxAppSnackbar} from '@app/services/cache';

import Button from '@app/components/Button';
import Input from '@app/components/Input';
import NavBar from '@app/components/NavBar';
import RenderIf from '@app/components/RenderIf';
import Text from '@app/components/Text';
import Section from '@app/components/Section';
import SnackBar from '@app/components/SnackBar';

import Icon from 'react-native-vector-icons/FontAwesome';

const AddReviewModal = ({
  showAddReviewModal,
  setShowAddReviewModal,
  product,
  refetchProductReviews,
}) => {
  const ratingDummyCounter = [0, 1, 2, 3, 4];

  const [rating, setRating] = useState(0);
  const [nickname, setNickname] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDetail, setReviewDetail] = useState('');

  const [addProductReviewHook] = useMutation(ADD_PRODUCT_REVIEW);
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (
      rating !== 0 &&
      nickname !== '' &&
      reviewTitle !== '' &&
      reviewDetail !== ''
    ) {
      try {
        setLoading(true);
        await addProductReviewHook({
          variables: {
            input: {
              entity_pk_value: product.id,
              nickname: nickname,
              title: reviewTitle,
              detail: reviewDetail,
              ratings: [
                {
                  rating_name: 'Rating',
                  value: rating,
                },
              ],
            },
          },
        });
        await refetchProductReviews();
        setLoading(false);
        setShowAddReviewModal(false);
      } catch (error) {
        setLoading(false);
        setShowAddReviewModal(false);
      }
    } else {
      rxAppSnackbar({
        message: 'Please make sure every field is not empty',
      });
    }
  };

  return (
    <Modal
      visible={showAddReviewModal}
      onRequestClose={() => setShowAddReviewModal(false)}>
      <ScrollView style={{flex: 1}}>
        <NavBar
          title="Write a Review"
          useBack
          useBackPress={() => setShowAddReviewModal(false)}
        />
        <Section padding2 alignStart>
          <Section alignStart spaceBetween>
            <Text small>You're reviewing : </Text>
            <Text bold large>
              {product.name}
            </Text>
          </Section>

          {/* rating stars block  */}
          <Section alignStart vmargin={15}>
            <Text>Rating</Text>
            <Section row>
              {ratingDummyCounter.map((dummyRating, index) => {
                if (rating >= index + 1) {
                  return (
                    <Section
                      onPress={() => setRating(index + 1)}
                      style={{marginHorizontal: 5}}>
                      <Icon name="star" size={25} color={Colors.PRIMARY} />
                    </Section>
                  );
                } else {
                  return (
                    <Section
                      onPress={() => setRating(index + 1)}
                      style={{marginHorizontal: 5}}>
                      <Icon name="star-o" size={25} color={Colors.PRIMARY} />
                    </Section>
                  );
                }
              })}
            </Section>
          </Section>

          {/* input block */}
          <Input
            label="Nickname"
            placeholder="Ex : Michael"
            value={nickname}
            onChangeText={setNickname}
            styleProp={{width: '100%'}}
            editable={!loading}
          />
          <Input
            label="Summary"
            placeholder="Enter your review summary"
            value={reviewTitle}
            onChangeText={setReviewTitle}
            styleProp={{width: '100%'}}
            editable={!loading}
          />
          <Input
            label="Review"
            placeholder="Write your review here"
            multiline={true}
            numberOfLines={10}
            value={reviewDetail}
            onChangeText={setReviewDetail}
            styleProp={{width: '100%'}}
            editable={!loading}
          />
          <RenderIf condition={!loading}>
            <Button
              label="Submit Review"
              styleProp={{
                backgroundColor: Colors.PRIMARY,
                borderColor: Colors.WHITE,
                borderWidth: 0.15,
                width: '100%',
                marginVertical: 20,
              }}
              onPress={submitReview}
              textStyleProp={{color: Colors.WHITE, fontWeight: 'bold'}}
              disabled={loading}
            />
          </RenderIf>
          <RenderIf condition={loading}>
            <ActivityIndicator />
          </RenderIf>
        </Section>
      </ScrollView>
      <SnackBar />
    </Modal>
  );
};

export default withProfiler(AddReviewModal, {name: 'AddReviewModal'});
