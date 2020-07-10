# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

5000.times do 
	Product.create!(
		name: Faker::Device.model_name,
		model: Faker::Device.build_number,
		brand: Faker::Device.manufacturer,
        year:rand(1960..2010),
      	ram: rand(1..16),
        external_storage: rand(1..128),
      	info: Faker::Lorem.sentence
		 )
end