# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140601164524) do

  create_table "action_dims", force: true do |t|
    t.string   "action_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ref_dims", force: true do |t|
    t.string   "referer_url"
    t.string   "event_name"
    t.string   "platform_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "time_dims", force: true do |t|
    t.integer  "month"
    t.integer  "year"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_dims", force: true do |t|
    t.integer  "age"
    t.string   "gender"
    t.string   "city"
    t.datetime "register_time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_log_facts", force: true do |t|
    t.integer  "user_dim_id"
    t.integer  "time_dim_id"
    t.integer  "action_dim_id"
    t.integer  "ref_dim_id"
    t.integer  "action_number"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_log_facts", ["action_dim_id"], name: "index_user_log_facts_on_action_dim_id"
  add_index "user_log_facts", ["ref_dim_id"], name: "index_user_log_facts_on_ref_dim_id"
  add_index "user_log_facts", ["time_dim_id"], name: "index_user_log_facts_on_time_dim_id"
  add_index "user_log_facts", ["user_dim_id"], name: "index_user_log_facts_on_user_dim_id"

end
