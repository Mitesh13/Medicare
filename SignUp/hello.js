<Container style = { styles.container }>
            <Form>
            <Item floatingLabel >
            <Label style = {{ padding: 5 } } >Email</Label> 
           
            <Input autocorrect = { false }
            autoCapitalize = "none"
            onChangeText = {
                (email) => this.setState({ email }) }
            /> </Item>

            <Item floatingLabel >
            <Label style={{padding: 5}}> Password </Label> 
            <Input autocorrect = { false }
            autoCapitalize = "none"
            secureTextEntry = { true }
            onChangeText = {(password) => this.setState({password})}/>
            </Item>
            
            <Button style = {{ marginTop: 10, marginLeft: 15, padding: 10 }}
            success rounded onPress = {() => this.loginUser(this.state.email.trim(), this.state.password) } >
            <Text style = {{ color: 'white' }}> Login </Text> </Button>

            <Button style = {
                { marginTop: 10, marginLeft: 15, padding: 10, } } primary rounded onPress = {() => this.signUpUser(this.state.email.trim(), this.state.password)}>
            <Text style = {{ color: 'white' } } > Sign Up </Text></Button>
            </Form>
            </Container>