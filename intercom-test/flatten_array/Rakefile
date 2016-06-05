require "json"
require_relative 'array_helper.rb'

task :execute_flatten do
  STDOUT.puts "Enter the array you want to flat. Format => [1,2,3 [4,5]]"
  user_input = STDIN.gets.strip
  
  encoded_input = []
  begin
    encoded_input = JSON.parse(user_input) #because console will give us user_input as string.
  rescue
    puts "Invalid Input. Please run it again"
    next
  end
  
  if encoded_input.length > 0
    puts "Output = "
    array_helper = ArrayHelper.new(encoded_input)
    puts "Before flatten, length = #{array_helper.array.length}"
    array_helper.flatten!
    puts "Before flatten, length = #{array_helper.array.length}"
  else
    puts "THE END"  
  end
end