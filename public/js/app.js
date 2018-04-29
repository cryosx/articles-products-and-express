let articleTitleLabel = document.getElementById('input_title_label');
let articleInputTitle = document.getElementById('input_title_test');

articleInputTitle.onfocus = function() {
  articleTitleLabel.style.transition = 'color 0.3s, background-color 0.3s';
  articleTitleLabel.style.color = 'white';
  articleTitleLabel.style.backgroundColor = 'black';
};
articleInputTitle.onblur = function() {
  articleTitleLabel.style.transition = 'color 0.3s, background-color 0.3s';
  articleTitleLabel.style.color = 'black';
  articleTitleLabel.style.backgroundColor = 'white';
};
