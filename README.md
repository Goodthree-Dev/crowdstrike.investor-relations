# This is a Jekyll project

You may need to run these commands before the ones below (Please note the Ruby Version Number):
* brew install ruby
* echo 'export PATH="/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/3.0.0_1/bin:$PATH"' >> ~/.zshrc
* source ~/.zshrc
--

# To Install Jekyll
* gem install bundler jekyll
* gem install -n /usr/local/bin jekyll
* bundle add webrick
* bundle update webrick
* bundle exec jekyll serve

# To Build Production Site
* jekyll build
