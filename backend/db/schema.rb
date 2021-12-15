# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_15_171451) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "campaigns", force: :cascade do |t|
    t.string "name"
    t.string "tags", default: [], array: true
    t.bigint "user_id"
    t.bigint "template_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "subject"
    t.integer "no_emails_sent", default: 0
    t.integer "no_emails_not_sent", default: 0
    t.index ["template_id"], name: "index_campaigns_on_template_id"
    t.index ["user_id"], name: "index_campaigns_on_user_id"
  end

  create_table "recipients", force: :cascade do |t|
    t.string "email"
    t.string "tags", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.string "firstname"
    t.string "lastname"
    t.index ["user_id"], name: "index_recipients_on_user_id"
  end

  create_table "templates", force: :cascade do |t|
    t.text "markdown"
    t.string "collaborator_ids", default: [], array: true
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.index ["user_id"], name: "index_templates_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
    t.string "reset_password_token", default: ""
    t.datetime "reset_password_token_sent_at"
  end

end
