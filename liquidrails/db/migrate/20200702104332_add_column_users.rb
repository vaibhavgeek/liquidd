class AddColumnUsers < ActiveRecord::Migration[6.0]
  def change
  		add_column(:users, :fname, :string)
  		add_column(:users, :lname, :string)
  		add_column(:users, :promotions, :string)
  		add_column(:users, :picture, :string)
  		add_column(:users, :username, :string)
  		add_column(:users, :github, :string)
  		add_column(:users, :linkedin, :string)
  		add_column(:users, :twitter, :string)
  		add_column(:users, :verified, :boolean)
  end
end
