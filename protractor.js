var status = element(by.binding('status'));
var data = element(by.binding('data'));
var fetchBtn = element(by.id('fetchbtn'));
var fetchBtn2 = element(by.id('fetchbtn2'));
var fetchBtn3 = element(by.id('fetchbtn3'));
var sampleGetBtn = element(by.id('samplegetbtn'));
var invalidJsonpBtn = element(by.id('invalidjsonpbtn'));

it('should make an xhr GET request', function() {
    sampleGetBtn.click();
    fetchBtn.click();
    fetchBtn2.click();
    fetchBtn3.click();
    expect(status.getText()).toMatch('200');
    expect(data.getText()).toMatch(/Hello, \$http!/);
});

// Commented out due to flakes. See https://github.com/angular/angular.js/issues/9185
// it('should make a JSONP request to angularjs.org', function() {
//   var sampleJsonpBtn = element(by.id('samplejsonpbtn'));
//   sampleJsonpBtn.click();
//   fetchBtn.click();
//   expect(status.getText()).toMatch('200');
//   expect(data.getText()).toMatch(/Super Hero!/);
// });

it('should make JSONP request to invalid URL and invoke the error handler',
    function() {
        invalidJsonpBtn.click();
        fetchBtn.click();
        fetchBtn2.click();
        fetchBtn3.click();
        expect(status.getText()).toMatch('0');
        expect(data.getText()).toMatch('Request failed');
    });