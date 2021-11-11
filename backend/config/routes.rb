Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users 
      resources :templates
      resources :recipients do 
        collection {post :import}
        collection {get :export}
      end 
      resources :campaigns do 
        member do 
          post 'deliver'
        end 
      end 
    end
  end

  get "*path", to: 'pages#index' , via: :all
end