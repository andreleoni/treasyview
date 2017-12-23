Rails.application.routes.draw do
  resources :items
  match '*any' => 'application#options', :via => [:options]
end
