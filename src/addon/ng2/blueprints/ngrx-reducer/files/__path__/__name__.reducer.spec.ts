import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import { <%= classifiedModuleName %>Reducer } from './<%= fileName %>.reducer';

describe('<%= classifiedModuleName %>', () => {
  it('should exist', () => {
    expect(<%= classifiedModuleName %>Reducer).toBeTruthy();
  });
});
