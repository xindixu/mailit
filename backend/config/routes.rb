Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users
      resources :templates do 
        collection {get :built_in}
        collection {get 'built_in/analytics', to: 'templates#analytics'}
        member do 
          post 'built_in/used', to: 'templates#used'
        end 
      end 
      resources :recipients do 
        collection {post :import}
        collection {get :export}
      end 
      resources :campaigns do 
        member do 
          post 'deliver'
          get 'analytics'
          get 'email_opened'
        end 
      end 
      post 'login', to: 'authentication#login'
      post 'password/forgot', to: 'passwords#forgot'
      post 'password/reset', to: 'passwords#reset'
    end
  end

  get "*path", to: 'pages#index' , via: :all
end