import {animate} from './animate';

export const getLoadingIndicatorDefaultValues = () => ({
  show: false
  , color: 'primary'
  , mode: 'indeterminate'
  , value: null
});

export const load = (subscribtion, loadingIndicator, getContent, name, handle) => {
  loadingIndicator.show = true;

  const get = () => {
    if (subscribtion) {
      subscribtion.unsubscribe();
    }

    subscribtion = getContent(name).subscribe(data => {
      handle(data);

      loadingIndicator.show = false;
    }
    , retryTimeout => {
      loadingIndicator.color = 'warn';
      loadingIndicator.mode = 'determinate';
      loadingIndicator.value = 100;

      animate(progress => {
        loadingIndicator.value = Math.round(100 - 100 * progress);
      }, retryTimeout * 1000, () => {
        loadingIndicator.color = 'primary';
        loadingIndicator.mode = 'indeterminate';
        get();
      });
    });
  };

  get();
};
