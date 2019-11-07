import React, { useRef } from 'react'
import styled from 'styled-components'

import useCanvas from '@/hooks/useCanvas'
import { useMeasure, useMouse } from 'react-use'

const range = n => [...Array(n)].map((_, i) => i)

const Wrapper = styled.div`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
`

const Main = styled.canvas`
	width: 100%;
	height: 100%;
`

const circle = ({ ctx, size, fill, stroke, strokeWidth, x, y }) => {
	if (!ctx) return
	ctx.beginPath()
	ctx.arc(x, y, size, 0, 2 * Math.PI)
	if (fill) {
		ctx.fillStyle = fill
		ctx.fill()
	}
	if (stroke && strokeWidth) {
		ctx.strokeStyle = stroke
		ctx.lineWidth = strokeWidth
		ctx.stroke()
	}
}

const grid = ({
	ctx,
	size = 1,
	width,
	height,
	color = '#474747',
	space = 24,
	padding = 1,
}) => {
	const c = range(Math.floor(width / space) - padding)
	const l = range(Math.floor(height / space) - padding)

	const arr = c.flatMap(i =>
		l.map(j => ({
			x: (i + padding) * space,
			y: (j + padding) * space,
		})),
	)

	arr.forEach(({ x, y }) => circle({ ctx, size, fill: color, x, y }))
}

const ripples = ({
	ctx,
	size = 24,
	width = 0,
	height = 0,
	mouseX = 0,
	mouseY = 0,
	count = 24,
}) => {
	ctx.clearRect(0, 0, width, height)
	grid({ ctx, width, height })

	range(count).forEach(n => {
		circle({
			ctx,
			size: size * (n + 1),
			x: mouseX + size * n - n * size * (mouseX / (width / 2)),
			y: mouseY + size * n - n * size * (mouseY / (height / 2)),
			stroke: '#72DEC2',
			strokeWidth: 1,
		})
	})
}

const CanvasEtymos = () => {
	const mouseRef = useRef()
	const [ref, { width, height }] = useMeasure()
	const { elX: mouseX, elY: mouseY } = useMouse(mouseRef)
	const noRender = typeof window === 'undefined' || !width || !height

	const canvasRef = useCanvas(ctx => {
		if (noRender) return null
		ctx.clearRect(0, 0, width, height)
		ripples({ ctx, width, height, mouseX, mouseY })
	})

	return (
		<div ref={mouseRef}>
			<Wrapper ref={ref}>
				<Main width={width} height={height} ref={canvasRef} />
				<div>
					{width}x{height}
				</div>
				<div>
					{mouseX}x{mouseY}
				</div>
				<div>{JSON.stringify({ noRender })}</div>
			</Wrapper>
		</div>
	)
}

export default CanvasEtymos