require "spec_helper"

describe ArrayHelper do
 
    before :each do
        test_data = YAML.load_file("./test_data/array_helper_data.yml")
        @array_helper = ArrayHelper.new(test_data)
    end
    
    describe "#new" do
        it "takes an array and returns a ArrayHelper object" do                        
            expect(@array_helper).to be_an_instance_of ArrayHelper                        
        end
    end
    
    describe "#flatten!" do
        it "flattens the @array instance" do            
            @array_helper.flatten!                       
            
            @array_helper.array.each do |e|                
                expect(e).not_to be_an_instance_of Array
            end
        end
    end
    
    describe "#flatten" do
        it "flattens the @array instance and gives back a new array" do
            result = @array_helper.flatten!
            
            expect(result).to be_an_instance_of Array
            
            result.each do |e|
                expect(e).not_to be_an_instance_of Array
            end
        end
    end
end