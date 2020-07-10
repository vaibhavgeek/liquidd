Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
	resources :sessions, only: [:create]
    resources :registrations, only: [:create]
    root to: "static#home"
    post 'password/forgot', to: 'passwords#forgot'
	post 'password/reset', to: 'passwords#reset'
    delete :logout, to: "sessions#logout"
    get :logged_in, to: "sessions#logged_in"
    get :all_products, to: "products#all_products"
    get 'product/:id', to: "products#product", as: 'product'
    get 'products/search', to: "products#search", as: 'search'
end
