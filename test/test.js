const tape = require('tape')

tape('should test things', function(t) {
    t.test('like assertions', function(assert) {
        assert.equals('cat', 'cat')
        assert.end()
    })
})