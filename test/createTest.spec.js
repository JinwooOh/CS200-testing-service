import React from 'react';
var assert = require('chai').assert;
var createTest = require('../client/src/components/createTest/CreateTest.js')
var pullQuestions = require('../client/src/components/createTest/PullQuestions.js')
var pullingOptions = require('../client/src/components/createTest/PullingOptions.js')

describe('PullQuestions', function (){
    it('PullQuestions should return correct number of questions from database', function () {
        assert.equal(pullQuestion(),1)
    });


});