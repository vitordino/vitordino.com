import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import getTypeStyle from '@/utils/getTypeStyle'

import ColorMode from '@/components/ColorMode'
import Container from '@/components/Container'
import Text from '@/components/Text'
import Spacer from '@/components/Spacer'
import Grid from '@/components/Grid'

const getColor = color => p => p.theme.colors.get(color) || color

const Wrapper = styled.div`
	color: ${p => getColor(p.color)};
	background: ${p => getColor(p.background)};
`

const Content = styled(Text)`
	& > * + * {
		margin-top: 1.75em;
	}

	code {
		background: ${p => getColor('base06')};
		padding: 0 0.25em;
		border-radius: 0.125rem;
	}

	pre {
		background: ${p => p.theme.colors.dark.base00};
		color: ${p => p.theme.colors.dark.base};
		overflow: auto;
		margin-left: -1rem;
		margin-right: -1rem;
		margin-bottom: 4rem;
		padding: 2rem 1rem;
		${getTypeStyle(1)};
		${p => p.theme.above('md')`
			margin-left: -2rem;
			margin-right: -2rem;
			padding: 2rem 2rem;
		`}
		${p => p.theme.above('lg')`
			margin-left: -8.675%;
			margin-right: -8.675%;
			padding: 2rem 8.675%;
			border-radius: 0.125rem;
		`}
		${p => p.theme.above('xg')`
			margin-left: -10.5%;
			margin-right: -10.5%;
			padding: 2rem 10.5%;
		`}
		code {
			background: none;
			padding: 0;
			border-radius: 0;
		}
	}
`

const TextSlice = ({ color, background, colorMode, children }) => (
	<ColorMode mode={colorMode}>
		<Wrapper as='section' color={color} background={background}>
			<Container>
				<Spacer.V xs={8} />
				<Grid.Row>
					<Grid.Column xs={0} lg={1} xg={2} />
					<Grid.Column xs={16} lg={12} xg={10}>
						<Content xs={1} md={3}>
							{children}
						</Content>
					</Grid.Column>
				</Grid.Row>
			</Container>
			<Spacer.V xs={12} />
		</Wrapper>
	</ColorMode>
)

TextSlice.defaultProps = {
	color: 'base',
	background: 'base00',
}

export default TextSlice
