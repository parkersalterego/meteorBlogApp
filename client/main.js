import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { renderRoutes, onAuthChange } from '../imports/routing/routes';
import { Tracker } from 'meteor/tracker';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(renderRoutes(), document.getElementById('app'));
});