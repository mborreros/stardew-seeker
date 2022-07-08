puts "Seeding users"

User.create([
  {username: "sasha", password_digest: BCrypt::Password.create("password"), name: "Sasha", image: "", bio: "I love farming games!"}, 
  {username: "maya", password_digest: BCrypt::Password.create("password"), name: "Maya", image: "", bio: "Started playing Stardew Valley because I grew up playing Harvest Moon. Long live Mineral Town!"}, 
  {username: "edward", password_digest: BCrypt::Password.create("password"), name: "Edward", image: "", bio: "This game is like a quest based Minecraft, which appeals to me."}, 
  {username: "timbo",  password_digest: BCrypt::Password.create("password"), name: "Timbo", image: "", bio: "I game to get my mind off of things and this game is perfect for that. I have been playing it for years."}])

puts "User seeding completed"

puts "Seeding goals"

status_options = ["unstarted", "in progress", "completed"]
user_ids = User.all.ids

Goal.create([
  {title: "Grow all fruit tree types", description: "Unlock Greenhouse from Community Center completing all Pantry Bundles. Tree types include: appricot, cherry, banana, mango, orange, peach, apple, and pomegranate.", status: status_options.sample, user_id: user_ids.sample},
  {title: "Reach the Desert", description: "Unlock the Bus from Community Center completing all Vault bundles. Have 500g for bus fare.", status: status_options.sample, user_id: user_ids.sample},
  {title: "Complete Community Center Fish Bundle by Year 2", description: "Currently missing fish that are catchable during rainy weather. Remaining fish to collect: Red Snapper.", status: status_options.sample, user_id: user_ids.sample},
  {title: "Marry Maru", description: "Loves cauliflower, strawberries, and diamonds as gifts. Give a gift on her birthday, Summer 10.", status: status_options.sample, user_id: user_ids.sample},
  {title: "Reach level 10 friendship with Linus", description: "Loves yams, cactus fruit, and coconuts. Also likes all foraged items. Give a gift on his birthday, Winter 3.", status: status_options.sample, user_id: user_ids.sample},
  {title: "Construct Cellar", description: "Upgrade house three times. First upgrade: 10,000g and 450 wood pieces. Second upgrade: 50,000g and 150 hardwood. Third and final upgrade: 100,000g.", status: status_options.sample, user_id: user_ids.sample}
])

puts "Goals seeding completed"

puts "Seeding tags"

categoriy_types = ["farming", "love", "friendship", "bundles", "mining", "fishing", "building", "farm layout", "cooking", "foraging", "animals", "town"]

categoriy_types.each do |category|
  Tag.create([{category: category}])
end

puts "Tags seeding completed"

puts "Seeding goal/tag join table"

GoalTag.create([
  {goal_id: 1, tag_id: 1},
  {goal_id: 2, tag_id: 12},
  {goal_id: 3, tag_id: 6},
  {goal_id: 4, tag_id: 2},
  {goal_id: 5, tag_id: 3},
  {goal_id: 6, tag_id: 7}
])

puts "Goal/Tag join table seeding completed"