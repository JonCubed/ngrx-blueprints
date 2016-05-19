import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import { <%= classifiedModuleName %>Reducer } from './<%= fileName %>.reducer';

describe('<%= classifiedModuleName %>', () => {
  it('should create an instance', () => {
    expect(new <%= classifiedModuleName %>Reducer()).toBeTruthy();
  });
});
