// Reference/source: https://gist.github.com/Fermain/165e94dd22bf2672758ca84691de8bbb

export default {
  setItem: jest.fn((key, value) => (localStorage[key] = value)),
  getItem: jest.fn((key) => localStorage[key] || null),
  removeItem: jest.fn((key) => delete localStorage[key]),
  clear: jest.fn(() => Object.keys(this).forEach((key) => delete this[key])),
};
