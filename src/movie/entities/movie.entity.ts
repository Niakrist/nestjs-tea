import { ActorEntity } from 'src/actor/entities/actor.entity';
import { ReviewEntity } from 'src/review/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MoviePposterEntity } from './poster.entity';

export enum Genre {
  ACTION = 'action',
  COMEDY = 'comedy',
  DRAMA = 'drama',
  HORROR = 'horror',
}

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    name: 'release_year',
    type: 'int',
    unsigned: true,
  })
  releaseYear: number;

  @Column({
    name: 'is_available',
    type: 'boolean',
    default: false,
  })
  isAvailable: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 0.0,
  })
  rating: number;

  @Column({
    name: 'release_data',
    type: 'date',
    nullable: true,
  })
  releaseData: string;

  @Column({
    type: 'enum',
    enum: Genre,
    default: Genre.ACTION,
  })
  genre: Genre;

  @Column({ name: 'poster_id', type: 'uuid', nullable: true })
  posterId: string;

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: ActorEntity[];

  @OneToOne(() => MoviePposterEntity, (poster) => poster.movie, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'poster_id' })
  poster: MoviePposterEntity | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
