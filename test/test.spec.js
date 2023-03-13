/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const app = require("../index")

describe('Sample Test', function() {
    it('should pass', function() {
      expect(true).toBe(true);
    });
  });
  describe('Complex Test', function() {
    it('should pass', function() {
      expect(true).toBe(false);
    });
  });