import React from 'react';
var assert = require('chai').assert;
var createTest = require('../client/src/components/createTest/CreateTest.js')
var pullQuestions = require('../client/src/components/createTest/PullQuestions.js')
var pullingOptions = require('../client/src/components/createTest/PullingOptions.js')

describe('CreateTest', function (){
    it('Should populate props with initial values', function () {
    });
    it('Should display relevent props inside input fields', function () {
    });
    it('Should send an API call to DB when CreateTest button is clicked, containing all the information on page to create new exam object', function () {
    });
    it('Reset button should set all input fields to their default values', function () {
    });

});

describe('PullQuestions', function (){
    it('Should return correct number of questions from database', function () {
        assert.equal(pullQuestion(),1)
    });
    it('Should shuffle questions when Shuffle button is clicked', function () {
    });
    it('Should remove questions from display when Remove button is clicked', function () {
    });
    it('Should regenerate new questions on display when Regenerate button is clicked', function () {
    });

});