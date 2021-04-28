Rails.application.routes.draw do

  root 'sketches#index'
  resources :comments
  resources :sketches
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end
