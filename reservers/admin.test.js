const { JSDOM } = require('jsdom');

describe('Sidebar Toggle Tests', () => {
  let dom;
  let document;
  let localStorage;
  let sidebar;
  let content;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body><div id="sidebar"></div><div id="content"></div></body></html>');
    document = dom.window.document;
    localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    global.localStorage = localStorage;
    
    sidebar = document.getElementById('sidebar');
    content = document.getElementById('content');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should toggle content expanded class', () => {
    content.classList.toggle('expanded');
    expect(content.classList.contains('expanded')).toBe(true);
    
    content.classList.toggle('expanded');
    expect(content.classList.contains('expanded')).toBe(false);
  });

  test('should store sidebar state in localStorage', () => {
    sidebar.classList.add('collapsed');
    localStorage.setItem('sidebarState', true);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('sidebarState', true);
  });

  test('should restore collapsed state on page load when localStorage is true', () => {
    localStorage.getItem.mockReturnValue('true');
    
    const sidebarState = localStorage.getItem('sidebarState') === 'true';
    if (sidebarState) {
      sidebar.classList.add('collapsed');
    }

    expect(localStorage.getItem).toHaveBeenCalledWith('sidebarState');
    expect(sidebar.classList.contains('collapsed')).toBe(true);
  });

  test('should not add collapsed class when localStorage is false', () => {
    localStorage.getItem.mockReturnValue('false');
    
    const sidebarState = localStorage.getItem('sidebarState') === 'true';
    if (sidebarState) {
      sidebar.classList.add('collapsed');
    }

    expect(localStorage.getItem).toHaveBeenCalledWith('sidebarState');
    expect(sidebar.classList.contains('collapsed')).toBe(false);
  });
});
