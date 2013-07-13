require 'spec_helper'

describe Turn do
  it { should belong_to(:game) }
  it { should validate_presence_of :position }
  it "validates uniqueness of position scoped to :game_id and attacked" do
    create :game
    Turn.last.should validate_uniqueness_of(:position).scoped_to([:game_id, :attacked])
  end
end
