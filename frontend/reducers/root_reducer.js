import {
  RECEIVE_STATE,
  UPDATE_TEXT,
  UPDATE_SLIDE_INDEX
} from '../actions';
import slidesReducer from './slides_reducer';
import demoText from '../util/demo_text';
import { parseSlides } from '../util/slides';

const defaultState = {
  text: window.lectureText || demoText,
  slides: parseSlides(demoText),
  slideIndex: 0
};

export default (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {

    case RECEIVE_STATE:
      let {text, slideIndex} = action;
      if (!text && text !== '') {
        text = defaultState.text;
      }
      slideIndex = parseInt(slideIndex) || defaultState.slideIndex;
      const slides = slidesReducer(
        state.slides, Object.assign({}, action, {text}));
      if (slideIndex >= slides.length) {
        slideIndex = slides.length - 1;
      }

      return {text, slides, slideIndex};

    case UPDATE_TEXT:
      return Object.assign({}, state, {
        text: action.text,
        slides: slidesReducer(state.slides, action)
      });

    case UPDATE_SLIDE_INDEX:
      slideIndex = parseInt(action.slideIndex);
      if (slideIndex >= state.slides.length) {
        slideIndex = slides.length - 1;
      }
      return Object.assign({}, state, {slideIndex});

    default:
      return state;
  }
};
