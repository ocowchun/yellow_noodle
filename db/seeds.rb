# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)




def create_user
  g=Random.rand(10)
  age=Random.rand(30)+13
  month=Random.rand(12)+1
  year=Random.rand(2)+2013
  day=Random.rand(28)+1
  register_time=DateTime.new(year,month,day)
  if g>5
    gender="male"
  else
    gender="female"
  end
  UserDim.create(city:Faker::Address.city,gender:gender,age:age,register_time:register_time)
end

def create_refer
  # referer_url,event_name,platform_name
  # RefDim.create(referer_url:referer_url,event_name:event_name,platform_name:platform_name)
end

def create_actions user_dim_id,time_dim_id
  login_amount=Random.rand(20)
  create_action(user_dim_id,time_dim_id,3,login_amount)
  post_amount=Random.rand(60)
  tag_amount=Random.rand(60)
  comment_amount=Random.rand(60)

  create_action(user_dim_id,time_dim_id,1,post_amount)
  create_action(user_dim_id,time_dim_id,2,tag_amount)
  create_action(user_dim_id,time_dim_id,4,comment_amount)
end

def create_action user_dim_id,time_dim_id,action_dim_id,action_number
  UserLogFact.create(user_dim_id:user_dim_id,time_dim_id:time_dim_id,
                     action_dim_id:action_dim_id,action_number:action_number)
end

# 模擬三個月的使用者使用情況
# 先有使用者
# 使用者從何而來
# 使用行為 post,tag,login.comment
# ActionDim.create(action_name:"post")
# ActionDim.create(action_name:"tag")
# ActionDim.create(action_name:"login")
# ActionDim.create(action_name:"comment")

# 12.times  do |time|
#   TimeDim.create(month:time+1,year:2013)
# end
# 12.times  do |time|
#   TimeDim.create(month:time+1,year:2014)
# end


def create_action_logs user_dim_id,start_time_id,end_time_id
  nums=end_time_id-start_time_id+1
  nums.times do|num|
    time_id=num+start_time_id
    create_actions(user_dim_id,time_id)
  end
end

UserDim.all.each do |user|
  user_dim_id= user.id
  register_time=user.register_time
  year=register_time.year
  month=register_time.month
  start_time_id=12*(year-2013)+month
  g=Random.rand(10)
  end_time_id=start_time_id+g
  end_time_id=24 if end_time_id>24
  create_action_logs(user_dim_id,start_time_id,end_time_id)
end

# 10.times do |x|
#   create_user
# end

# UserLogFact.create
