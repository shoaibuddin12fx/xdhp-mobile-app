import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  if (navigationRef.isReady()) {
    if (params) navigationRef.navigate(name, params);
    else navigationRef.navigate(name);
  }
}

const resetRoute = route => {
  if (navigationRef.isReady())
    navigationRef.reset({
      index: 0,
      routes: [{name: route}],
    });
};

export {resetRoute, navigate};
