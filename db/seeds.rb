require 'ffaker'

# User.delete_all

# User.create!(first_name: "Dart", last_name: "Vader", email: "vader@deathstar.net")
# User.create!(first_name: "Luke", last_name: "Skywalker", email: "luke@rebel.org")
# User.create!(first_name: "William", last_name: "Adama", email: "adama@galactica.battlestar.org")

# 50.times do
#   User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email)
# end

Farmer.delete_all
Field.delete_all
Farm.delete_all
farmer = Farmer.create!(accept_corn_contract: false, accept_switchgrass_contract: false, earnings: 1000)
farm = Farm.create!()
farmer.farm = farm
f1 = Field.create!(crop:"corn", fertilizer: false, pesticide: true, till: true, x:0, y:0)
f2 = Field.create!(crop:"grass", fertilizer: true, pesticide: true, till: false, x:0, y:0)
farm.fields << [f1, f2]